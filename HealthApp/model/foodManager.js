
const database = require("./database");

function dataRequest(username)
{    
    const tbFood = database.getTable("FOOD");
    let data = [];

    for (let food of tbFood["default"])
    {
        data.push(food);
    }

    if (tbFood[username])
    {
        for (let food of tbFood[username])
        {
            data.push(food);
        }
    }

    return { status: 200, content: data };
}

function dataSubmit(username, content)
{
    if (!content["meal-type"]) return { status: 400, content: "Missing required data - meal-type" };
    if (!content.name) return { status: 400, content: "Missing required data - name" };
    if (!content.calories) return { status: 400, content: "Missing required data - calories" };

    let food = {
        "meal-type": content["meal-type"],
        name: content.name,
        calories: content.calories
    };

    let table = database.getTable("FOOD");

    if (table[username])
    {
        let keys = Object.keys(table[username]);
        let nextFoodID = parseInt(keys[keys.length - 1]) + 1;
        table[username][nextFoodID].push(food);
    }
    else
    {
        table[username] = {
            "0": food
        };
    }

    database.overwriteTable("FOOD", table);

    return { status: 200, content: "Successfully added exercise" };
}


exports.dataRequest = dataRequest;
exports.dataSubmit = dataSubmit;