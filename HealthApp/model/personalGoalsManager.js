const database = require("./database");

function create(username, content)
{
    if (!content.type) return { status: 400, content: "Missing required data - type" };
    if (!content.startDate) return { status: 400, content: "Missing required data - start date" };
    if (!content.endDate) return { status: 400, content: "Missing required data - end date" };
    if (!content.extraData) return { status: 400, content: "Missing required data - extra data" };

    let table = database.getTable("PERSONALGOAL");

    //gets the last key and adds 1 for the new key

    let data = {
        type: content.type,
        startDate: content.startDate,
        endDate: content.endDate,
        status: "In Progress",
        extraData: content.extraData
    };

    if(table[username])  //if the user has goals
    {
        let currentIds = Object.keys(table[username]);
        let lastID =  Number(currentIds[currentIds.length-1]);
        let newId = lastID+ 1;
        table[username][newId] = data;
    }
    else  //if the user has no goals
    {
        table[username] = {};
        table[username][0] = data;
    }

    database.overwriteTable("PERSONALGOAL", table);
    
    return{ status: 200, content: "Successfully added exercise"};
}

function update(username,content)
{
    let table = database.getTable("PERSONALGOAL");
    if(!content.goalId) return { status: 400, content: "Missing Goal id"};

    //add more of these lines for different goal atrubutes if we plan on updating more but not needed now
    if(content.status) table[username][content.goalId].status = content.status;

    database.overwriteTable("PERSONALGOAL", table);
    return { status: 200, content: "Successfully updated goal stuff"};
}

function deleteGoal(username,content)
{
    if(content.goalId === null) return { status: 400, content: "Missing Goal id" };

    let table = database.getTable("PERSONALGOAL");

    if (table[username] && table[username][content.goalId])
    {
        delete table[username][content.goalId];
        database.overwriteTable("PERSONALGOAL", table);
        return { status: 200, content: "Successfully deleted Goal" };
    }
    
    return { status: 400, content: "No goal for username [" + username + "] and id [" + content.goalId + "]"};
}

function dataRequest(username, content)
{
    if (!content.date) return { status: 400, content: "Missing required data - date" };
    const table = database.getTable("PERSONALGOAL");
    let data = [];

    if(table[username])
    {
        let userGoals = table[username];
        for(entry in userGoals){
            let currentDateSplit = content.date.split("-");
            let currentDate = new Date (currentDateSplit[0],currentDateSplit[1],currentDateSplit[2])
            let currentGoalDateSplit = userGoals[entry].endDate.split("-");
            let currentGoalDate = new Date(currentGoalDateSplit[0],currentGoalDateSplit[1],currentGoalDateSplit[2])
            if(currentDate <= currentGoalDate)
            {
                userGoals[entry]["goalId"] = entry;
                data.push(userGoals[entry]);
            }
        }
        return { status: 200, content: data };
    }
    else
    {
        //if no goals we make a blank entry for the user and return nothing (since no goals)
        table[username] = {};
        return { status: 200, content: data };
    }
}

exports.update = update;
exports.create = create;
exports.deleteGoal = deleteGoal;
exports.dataRequest = dataRequest;