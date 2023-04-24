
const database = require("./database");

function dataRequest(username, content)
{
    if (!content.date) return { status: 400, content: "Missing required data - date" };
    
    const tbDiet = database.getTable("DIET");
    let foodIDs = [];

    if(tbDiet[username] && tbDiet[username][content.date])
    {
        foodIDs = tbDiet[username][content.date];
    }

    
    const tbFood = database.getTable("FOOD");
    let foods = [];
    let totalCalories = 0;
    
    for (let id of foodIDs)
    {
        let food = (id[0] === "d") ? tbFood["default"][id] : tbFood[username][id];
        foods.push(food);
        totalCalories += food.calories;
    }

    let data = {
        foods: foods,
        totalCalories: totalCalories
    };

    return { status: 200, content: data };
}

function dataSubmit(username, content)
{
    if (!content.date) return { status: 400, content: "Missing required data - date" };
    if (!content.foodID) return { status: 400, content: "Missing required data - foodID" };

    let table = database.getTable("DIET");
    if (table[username] && table[username][content.date])
    {
        table[username][content.date].push(content.foodID);
    }
    else
    {
        table[username] = {};
        table[username][content.date] = [content.foodID];
    }

    database.overwriteTable("DIET", table);

    return { status: 200, content: "Successfully added exercise" };
}


exports.dataRequest = dataRequest;
exports.dataSubmit = dataSubmit;