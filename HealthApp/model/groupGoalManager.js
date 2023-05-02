const database = require("./database")

//create new goal, only adds the user that has created the goal as other users will need to answer email
function create(username, content)
{
    if (!content.group) return { status: 400, content: "Missing required data - group" };
    if (!content.type) return { status: 400, content: "Missing required data - type" };
    if (!content.startDate) return { status: 400, content: "Missing required data - start date" };
    if (!content.endDate) return { status: 400, content: "Missing required data - end date" };
    if (!content.extraData) return { status: 400, content: "Missing required data - extra data" };

    let table = database.getTable("GROUPGOALS");

    let data = {
        users: [username],
        type: content.type,
        startDate: content.startDate,
        endDate: content.endDate,
        status: ["In Progress"],
        extraData: content.extraData
    };

    if(table[content.group])  //if the group has goals
    {
        let currentIds = Object.keys(table[content.group]);
        let lastID =  Number(currentIds[currentIds.length-1]);
        let newId = lastID+ 1;
        table[content.group][newId] = data;
    }
    else  //if the group has no goals
    {
        table[content.group] = {};
        table[content.group][0] = data;
    }

    database.overwriteTable("PERSONALGOALS", table);
    
    return{ status: 200, content: "Successfully added exercise"};
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
        database.overwriteTable("PERSONALGOALS", table);
        return { status: 200, content: "Successfully deleted Goal" };
    }
    
    return { status: 400, content: "No goal for group [" + content.groupName + "] and id [" + content.goalId + "]"};
}

//adds a user to the goal, adds the username and a status (same location in array as username)
//this would be triggered when the user answers the email
function addUser(username, content)   //username is user to delete, req from data manager and mailer may be different
{

}

//deletes a user from the goal, could make is so creator of goal cant delete themselves from it
//will be triggered when the user wants to leave the goal
function deleteUser(username, content) //username is user to delete, req from data manager and mailer may be different
{

}

//this will primarily used to update the status of each user individualy when they load up the group
function update(username, content)
{

}

//retrives the goals that the user is present in for a specific group
function dataRequest(username,content)
{
    if (!content.date) return { status: 400, content: "Missing required data - date" };
    if (!content.groupName) return { status: 400, content: "Missing required data - date" };

    const table = database.getTable("GROUPGOALS");
    let data = [];

    if(table[content.groupName])
    {
        let groupGoals = table[username];
        let currentDateSplit = content.date.split("-");
        for(entry in groupGoals){
            let currentGoalSplit = groupGoals[entry].endDate.split("-");
            if((currentDateSplit[0] < currentGoalSplit[0]) || (currentDateSplit[1] < currentGoalSplit[1]) || 
                    (currentDateSplit[2] <= currentGoalSplit[2]))
            {
                if (groupGoals[entry].users.includes(username))
                {
                    groupGoals[entry]["goalId"] = entry;
                    data.push(groupGoals[entry]);
                }
            }
        }
        return { status: 200, content: data };
    }

    return {status: 400, content: "Group not found in Database/no goals"};  //might actualy need to make a new use entry
}

//REMEMBER TO EXPORT FUNCTIONS AND ADD TO DATA MANAGER