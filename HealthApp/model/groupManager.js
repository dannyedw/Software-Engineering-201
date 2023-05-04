
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

    //check if users actually exist before adding them to the group
    const usertable = database.getTable("USER");
    let warningInfo = [];
    for (let uname of content.members)
    {
        if (usertable[uname])
        {
            groupData.pendingMembers.push(uname);
            emailManager.notifyGroupInvitation(uname, content.groupname);
        }
        else
        {
            warningInfo.push("No user found with username: " + uname);
        }
    }

    let grouptable = database.getTable("GROUP");

    if (grouptable[content.groupname] != null)
    {
        //group already exists, cannot be created
        return { status: 400, content: "Group name already taken" };
    }

    grouptable[content.groupname] = groupData;
    // console.log(grouptable);
    database.overwriteTable("GROUP", grouptable);

    return { status: 200, content: {
        message: "Successfully created group " + content.groupname,
        warnings: warningInfo
    }};
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
    if (!content.groupname) return { status: 400, content: "Missing required data - groupname" };
    if (!content.memberToRemove) return { status: 400, content: "Missing required data - memberToRemove" };

    let grouptable = database.getTable("GROUP");
    let usertable = database.getTable("USER");

    let group = grouptable[content.groupename];
    let memberPresent = false;

    if (group)
    {
        if (username === group.owner)
        {
            let index = group.members.indexOf(content.memberToRemove);
            if (index != -1)
            {
                //member is in members of group
                group.members.splice(index, 1);
                grouptable[content.groupname];
                memberPresent = true;
            }
            else
            {
                //member not verified part of group, check if they were still pending
                index = group.pendingMembers.indexOf(content.memberToRemove);
                if (index != -1)
                {
                    //member is in pending members, remove them
                    group.pendingMembers.splice(index, 1);
                    grouptable[content.groupname]
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
exports.addPendingUser = addPendingUser;
exports.removeMember = removeMember;
exports.erase = erase;
exports.getUserGroupData = getUserGroupData;