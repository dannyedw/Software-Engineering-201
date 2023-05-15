
const database = require("./database");
const userManager = require("./userManager")
const emailManager = require("./emailManager");

function create(username, content)
{
    if (!content.groupname) return { status: 400, content: "Missing required data - groupname" };
    if (!content.description) return { status: 400, content: "Missing required data - description" };
    if (!content.members) return { status: 400, content: "Missing required data - members" };

    let groupData = {
        owner: username,
        description: content.description,
        members: [],
        pendingMembers: []
    };

    let groupname = content.groupname;
    groupname.replace(" ", "_"); //replace spaces to prevent issues with urls and the groupname

    //check if users actually exist before adding them to the group
    const usertable = database.getTable("USER");
    let warningInfo = [];
    for (let uname of content.members)
    {
        if (usertable[uname])
        {
            //check if user is already in group in case somehow added more than once
            let index = groupData.pendingMembers.indexOf(uname);
            if (index === -1)
            {
                groupData.pendingMembers.push(uname);
                emailManager.notifyGroupInvitation(uname, groupname);
            }
            else
            {
                warningInfo.push("User already invited to group: " + uname);
            }
            
        }
        else
        {
            warningInfo.push("No user found with username: " + uname);
        }
    }

    let grouptable = database.getTable("GROUP");

    if (grouptable[groupname] != null)
    {
        //group already exists, cannot be created
        return { status: 400, content: "Group name already taken" };
    }

    grouptable[groupname] = groupData;
    database.overwriteTable("GROUP", grouptable);

    return { status: 200, content: {
        message: "Successfully created group " + groupname,
        warnings: warningInfo
    }};
}

function inviteUser(username, content)
{
    if (!content.groupname) return { status: 400, content: "Missing required data - groupname" };
    if (!content.usernameToAdd) return { status: 400, content: "Missing required data - usernameToAdd" };

    let grouptable = database.getTable("GROUP");

    let group = grouptable[content.groupname];
    if (!group) return { status: 400, content: "Group does not exist: " + content.groupname };
    
    if (username != group.owner) return { status: 400, content: "You do not have permission to invite people to this group" };


    for (let member of group.members)
    {
        if (member === content.usernameToAdd) return { status: 400, content: "Member already part of group: " + content.usernameToAdd };
    }

    for (let member of group.pendingMembers)
    {
        if (member === content.usernameToAdd) return { status: 400, content: "Member already part of group: " + content.usernameToAdd };
    }

    group.pendingMembers.push(content.usernameToAdd);
    emailManager.notifyGroupInvitation(content.usernameToAdd, content.groupname);

    grouptable[content.groupname] = group;
    database.overwriteTable("GROUP", grouptable);

    return { status: 200, content: "User successfully invited to group" };
}

function addPendingUser(username, groupname)
{
    let usertable = database.getTable("USER");
    let grouptable = database.getTable("GROUP");

    if (!usertable[username]) return { status: 400, content: "Invalid username: " + username };
    if (!grouptable[groupname]) return { status: 400, content: "Invalid groupname: " + groupname };

    let index = grouptable[groupname].pendingMembers.indexOf(username);
    if (index != -1)
    {
        grouptable[groupname].pendingMembers.splice(index, 1);
        grouptable[groupname].members.push(username);
        usertable[username].groups.push(groupname);
    }
    else
    {
        return { status: 401, content: "User does not have permission to join this group" };
    }

    database.overwriteTable("USER", usertable);
    database.overwriteTable("GROUP", grouptable);

    return { status: 200, content: "User successfully added to group" };
}

function removeMember(username, content)
{
    //MAKE SURE MEMBER IS REMOVED FROM THE GROUP,GOAL AND USER TABLES
    if (!content.groupname) return { status: 400, content: "Missing required data - groupname" };
    if (!content.memberToRemove) return { status: 400, content: "Missing required data - memberToRemove" };

    let grouptable = database.getTable("GROUP");
    let usertable = database.getTable("USER");
    let groupgoaltable = database.getTable("GROUPGOAL");

    let group = grouptable[content.groupname];
    let memberPresent = false;


    if (group)
    {
        if (username === group.owner || username === content.memberToRemove)
        {
            let index = group.members.indexOf(content.memberToRemove);
            if (index != -1)
            {
                //member is in members of group
                group.members.splice(index, 1);
                grouptable[content.groupname] = group;
                memberPresent = true;

                //UNTESTED - TEST WHEN WE CAN DELETE MEMBER FROM GROUP
                var goals = groupgoaltable[content.group]; //get all goals for the group being removed from
                if (goals)
                {
                    var keys = Object.keys(goals);  //gets all ids for each goal
                    for(let key in keys)  //loops through every goal
                    {
                        if(goals[key].users.includes(content.memberToRemove)) //if the goal has the user who is being removed participating
                        {
                            let memberLocation = goals[key].users.indexOf(content.memberToRemove); //gets the index of the user
                            goals[key].users.splice(memberLocation,1);  //next 3 lines removes user data
                            goals[key].status.splice(memberLocation,1);
                            goals[key].extraData[0].splice(memberLocation,1);
                        }
                    }
                }
            }
            else
            {
                //member not verified part of group, check if they were still pending
                index = group.pendingMembers.indexOf(content.memberToRemove);
                if (index != -1)
                {
                    //member is in pending members, remove them
                    group.pendingMembers.splice(index, 1);
                    grouptable[content.groupname] = group;
                    memberPresent = true;
                }
                else
                {
                    //member not pending either
                    return { status: 400, content: "Specified member is not part of group so cannot be removed: " + content.memberToRemove };
                }                
            }
        }
        else
        {
            return { status: 401, content: "You do not have permission to delete members" };
        }
    }


    if (memberPresent)
    {
        if (usertable[content.memberToRemove])
        {
            let user = usertable[content.memberToRemove];
            let index = user.groups.indexOf(content.groupname);
            if (index != -1)
            {
                user.groups.splice(index, 1);
                usertable[content.memberToRemove] = user;
            }
        }
        else
        {
            console.log("member (somehow) removed from group they weren't part of. member: " + content.memberToRemove + ", group: " + content.groupname);
        }
    }

    //UPDATES ALL THE TABLES
    database.overwriteTable("USER", usertable);
    database.overwriteTable("GROUP", grouptable);
    database.overwriteTable("GROUPGOAL", groupgoaltable);

    return { status: 200, content: "Member: " + content.memberToRemove + "successfully removed from group: " + content.groupname };
}

function erase(username, content)
{
    if (!content.groupname) return { status: 400, content: "Missing required data - groupname" };

    let grouptable = database.getTable("GROUP");
    let group = grouptable[content.groupname];

    if (!group) return { status: 400, content: "Invalid groupname: " + content.groupname };

    if(username === group.owner)
    {
        //update members' user table entries, and send them a notification of the group's deletion
        for (let user of group.members)
        {
            userManager.removeFromGroup(user, group.groupname);
            emailManager.notifyGroupDeletion(user, group.groupname);
        }

        delete grouptable[group.groupname];
        return { status: 200, content: "Group successfully deleted" };

    }
    else
    {
        return { status: 401, content: "You do not have permission to delete this group" };
    }
}

function getUserGroupData(username)
{
    let data = {};
    const usertable = database.getTable("USER");
    const user = usertable[username];

    let grouptable = database.getTable("GROUP");

    for (let groupname of user.groups)
    {
        if (grouptable[groupname])
        {
            data[groupname] = grouptable[groupname];
        }
        else
        {
            data[groupname] = "Invalid groupname";
        }
    }

    return { status: 200, content: data };
}



exports.create = create;
exports.inviteUser = inviteUser;
exports.addPendingUser = addPendingUser;
exports.removeMember = removeMember;
exports.erase = erase;
exports.getUserGroupData = getUserGroupData;