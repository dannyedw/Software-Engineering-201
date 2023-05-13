const database = require("./database");
const emailManager = require("../model/emailManager");

//create new goal, only adds the user that has created the goal as other users will need to answer email
function create(username, content)
{
    if (!content.group) return { status: 400, content: "Missing required data - group" };
    if (!content.type) return { status: 400, content: "Missing required data - type" };
    if (!content.startDate) return { status: 400, content: "Missing required data - start date" };
    if (!content.endDate) return { status: 400, content: "Missing required data - end date" };
    if (!content.extraData) return { status: 400, content: "Missing required data - extra data" };

    if(content.type != "weight") return { status: 400, content: "Invaid goal type" } ///CHANGE IF ADDING MORE GOAL TYPES

    let table = database.getTable("GROUPGOALS");
    let data = {
        users: [username],
        type: content.type,
        startDate: content.startDate,
        endDate: content.endDate,
        status: ["In Progress"],
        extraData: content.extraData
    };

    let newId;
    if(table[content.group])  //if the group has goals
    {
        let currentIds = Object.keys(table[content.group]);
        let lastID =  Number(currentIds[currentIds.length-1]);
        newId = lastID+ 1;
        table[content.group][newId] = data;
    }
    else  //if the group has no goals
    {
        table[content.group] = {};
        table[content.group][0] = data;
    }

    //NOTIFY ALL MEMBERS IN GROUP AND ADD THEM TO GOAL IF ACCEPTED 
    let goalDetails;
    if(content.type === "weight")
    {
        goalDetails = "Get to " + content.extraData[1] + "kg by " + content.endDate;
    }
    else
    {
        goalDetails = "Not valid goal";
    }

    let emailReqResponse = emailManager.notifyGroupGoalCreation(username, content.group, newId, goalDetails);
    if(emailReqResponse.status != 200)
    {
        return{status: 400, content: ("Error when sending emails: " + goalDetails.content)}
    }

    database.overwriteTable("GROUPGOALS", table);
    return{ status: 200, content: "Successfully created group goal" };
}

//delete goal, only user that created the goal can do this (or who ever is first in user array)
//the checking if the user created the goal shall be done client side
function deleteGoal(content) 
{
    if(content.groupName === null) return { status: 400, content: "Missing Group Name" };
    if(content.goalId === null) return { status: 400, content: "Missing Goal id" };

    let table = database.getTable("GROUPGOALS");

    if (table[content.groupName] && table[content.groupName][content.goalId])
    {
        delete table[content.groupName][content.goalId];
        database.overwriteTable("GROUPGOALS", table);
        return { status: 200, content: "Successfully deleted Goal" };
    }
    
    return { status: 400, content: "No goal for group [" + content.groupName + "] and id [" + content.goalId + "]"};
}

//adds a user to the goal, adds the username and a status (same location in array as username)
//this would be triggered when the user answers the email
function addUser(username, content)   //username is user to delete, req from data manager and mailer may be different
{
    //WILL NEED CHANGING IF ANOTHER GOAL type IS ADDED
    if(content.groupName === null) return { status: 400, content: "Missing Group Name" };
    if(content.goalId === null) return { status: 400, content: "Missing Goal id"};
    if(content.startWeight === null) return { status: 400, content: "Missing User Starting weight"};

    //make sure used adding is in group

    let table = database.getTable("GROUPGOALS");
    let userTable = database.getTable("USER");
    if(!userTable[username].groups.includes(content.groupName)) return { status: 400, content: "User does not exist in group"};

    if(table[content.groupName][content.goalId].users.includes(username))
    {
        return { status: 400, content: "User already in goal"}
    }

    table[content.groupName][content.goalId].users.push(username);
    table[content.groupName][content.goalId].status.push("In Progress")
    table[content.groupName][content.goalId].extraData[0].push(content.startWeight)

    database.overwriteTable("GROUPGOALS", table);
    return { status: 200, content: "Successfully updated goal stuff"};

}

//deletes a user from the goal, could make is so creator of goal cant delete themselves from it
//will be triggered when the user wants to leave the goal
function deleteUser(username, content) //username is user to delete, req from data manager and mailer may be different
{
    if(content.groupName === null) return { status: 400, content: "Missing Group Name" };
    if(content.goalId === null) return { status: 400, content: "Missing Goal id"};

    let table = database.getTable("GROUPGOALS");

    let userIndex = table[content.groupName][content.goalId].users.indexOf(username);
    if(userIndex === -1) return { status: 400, content: "User not found in Goal"};

    table[content.groupName][content.goalId].users.splice(userIndex, 1);
    table[content.groupName][content.goalId].status.splice(userIndex, 1);
    table[content.groupName][content.goalId].extraData[0].splice(userIndex, 1);

    database.overwriteTable("GROUPGOALS", table);
    return { status: 200, content: "Successfully updated goal stuff"};
}

//this will primarily used to update the status of each user individualy when they load up the group
function update(username, content)
{
    let table = database.getTable("GROUPGOALS");
    if(content.goalId === null) return { status: 400, content: "Missing Goal id"};
    if(content.groupName === null) return { status: 400, content: "Missing Group Name" };

    //add more of these lines for different goal atrubutes if we plan on updating more but not needed now
    let userIndex;
    if(content.status)
    {
        //finds user index as this index is the same for the status array
        userIndex = table[content.groupName][content.goalId].users.indexOf(username);
        if(userIndex === -1) return { status: 400, content: "User not found in Goal"};
        table[content.groupName][content.goalId].status[userIndex] = content.status;
    } 

    let goalDetails;
    if(table[content.groupName][content.goalId].type === "weight")
    {
        goalDetails = "Get to " + table[content.groupName][content.goalId].extraData[1] + "kg by " + 
        table[content.groupName][content.goalId].endDate;
    }
    else
    {
        goalDetails = "Not valid goal";
    }

    database.overwriteTable("GROUPGOALS", table);
    emailManager.notifyGroupGoalCompletion(username, content.groupName, goalDetails);
    return { status: 200, content: "Successfully updated goal stuff"};
}

//retrives the goals that the user is present in for a specific group
function dataRequest(username,content)
{
    if (!content.date) return { status: 400, content: "Missing required data - date" };
    if (!content.groupName) return { status: 400, content: "Missing required data - date" };

    const table = database.getTable("GROUPGOALS");
    groupName = content.groupName
    let data = {groupName: groupName,
                goals: []            
    };

    if(table[content.groupName])
    {
        let groupGoals = table[content.groupName];
        let currentDateSplit = content.date.split("-");
        for(entry in groupGoals){
            let currentGoalSplit = groupGoals[entry].endDate.split("-");
            if((currentDateSplit[0] < currentGoalSplit[0]) || (currentDateSplit[1] < currentGoalSplit[1]) || 
                    (currentDateSplit[2] <= currentGoalSplit[2]))
            {
                if (groupGoals[entry].users.includes(username))
                {
                    groupGoals[entry]["goalId"] = entry;
                    data.goals.push(groupGoals[entry]);
                }
            }
        }
        return { status: 200, content: data };
    }

    table[content.groupName] = {};
    return {status: 200, content: data}; 
}

exports.create = create;
exports.deleteGoal = deleteGoal;
exports.addUser = addUser;
exports.deleteUser = deleteUser;
exports.update = update;
exports.dataRequest = dataRequest;