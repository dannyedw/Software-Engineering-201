
const database = require("./database");
const userManager = require("./userManager")

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
    for (let un of content.members)
    {
        if (usertable[un])
        {
            groupData.pendingMembers.push(un);
        }
        else
        {

            warningInfo.push("No user found with username: " + un);
        }
    }

    let grouptable = database.getTable("GROUP");

    if (grouptable[content.groupname] != null)
    {
        //group already exists, cannot be created
        return { status: 400, content: "Group name already taken" };
    }

    grouptable[content.groupname] = groupData;
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

function dataRequest(username, content)
{
    if (!content.groupname) return { status: 400, content: "Missing required data - groupname" };

    let data = {};
    const table = database.getTable("GROUP");
    const group = table[content.groupname];

    if (!group) return { status: 400, content: "Invalid groupname: " + content.groupname };

    let isOwner = (username === group.owner);
    let isMember = false;
    for (let member of group.members)
    {
        if (username === member)
        {
            isMember = true;
            break;
        }
    }

    if (isOwner || isMember)
    {
        data = {
            owner: group.owner,
            description: group.description,
            members: group.members
        };
    }
    else
    {
        if (!group) return { status: 401, content: "You do not have permission to view this group" };
    }

    return { status: 200, content: data };
}



exports.create = create;
exports.addPendingUser = addPendingUser;
exports.erase = erase;
exports.dataRequest = dataRequest;