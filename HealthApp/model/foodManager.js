
const database = require("./database");

function dataRequest(username)
{    
    const tbFood = database.getTable("FOOD");
    let data = [];
    
    for (let foodID in tbFood["default"])
    {
        let food = tbFood["default"][foodID];
        let foodData = {
            foodID: foodID,
            mealType: food.mealType,
            name: food.name,
            calories: food.calories
        }
        data.push(foodData);
    }

    if (tbFood[username])
    {
        for (let foodID in tbFood[username])
        {
            let food = tbFood[username][foodID];
            let foodData = {
                foodID: foodID,
                mealType: food.mealType,
                name: food.name,
                calories: food.calories
            }
            data.push(foodData);
        }
    }

    let message = "Successfully requested food";
    console.log(message);
    return { status: 200, content: data };
}

function dataSubmit(username, content)
{
    if (!content.mealType) return { status: 400, content: "Missing required data - mealType" };
    if (!content.name) return { status: 400, content: "Missing required data - name" };
    if (!content.calories) return { status: 400, content: "Missing required data - calories" };

    let food = {
        mealType: content.mealType,
        name: content.name,
        calories: content.calories
    };


    let table = database.getTable("FOOD");

    let nextFoodID;
    if (table[username])
    {
        let keys = Object.keys(table[username]);
        nextFoodID = parseInt(keys[keys.length - 1]) + 1;
        table[username][nextFoodID].push(food);
    }
    else
    {
        table[username] = {
            "0": food
        };
        nextFoodID = "0";
    }

    database.overwriteTable("FOOD", table);

    let message = "Successfully submitted food";
    console.log(message);
    return { status: 200, content: {
        nextFoodID: nextFoodID
    }};
}


exports.dataRequest = dataRequest;
exports.dataSubmit = dataSubmit;