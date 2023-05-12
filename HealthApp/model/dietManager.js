
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
        let food = null; 
        if (id[0] === "d")
        {
            if (tbFood["default"][id]) food = tbFood["default"][id];
        }
        else
        {
            if (tbFood[username][id]) food = tbFood[username][id];
        }

        if (food)
        {
            foods.push(food);
            totalCalories += parseInt(food.calories);
        }
        else
        {
            console.log("invalid food id requested: " + id);
        }
    }

    let data = {
        foods: foods,
        totalCalories: totalCalories
    };

    let message = "Successfully requested diet";
    console.log(message);
    return { status: 200, content: data };
}

function dataSubmit(username, content)
{
    if (!content.date) return { status: 400, content: "Missing required data - date" };
    if (!content.foodID) return { status: 400, content: "Missing required data - foodID" };

    let table = database.getTable("DIET");
    if (table[username])
    {
        if (table[username][content.date])
        {
            table[username][content.date].push(content.foodID);
        }
        else
        {
            table[username][content.date] = [content.foodID];
        }
    }
    else
    {
        table[username] = {};
        table[username][content.date] = [content.foodID];
    }

    database.overwriteTable("DIET", table);

    let message = "Successfully added diet";
    console.log(message);
    return { status: 200, content: message };
}

function calorieRequest(username)
{
    const tbDiet = database.getTable("DIET");
    let foodIDs = [];
    
    const tbFood = database.getTable("FOOD");
    let foods = [];
    let totalCalories = [];
    let dates = [];
    let sumCalories=0;

    if(tbDiet[username])
    {
        foodIDs = tbDiet[username];

        for (let id in foodIDs)
        {
            let sumCalories = 0;
            foodids = foodIDs[id]
            dates.push(id)
            for (let foodid of foodids){
            let food = null; 
            if (foodid[0] === "d")
            {
                if (tbFood["default"][foodid]) food = tbFood["default"][foodid];
            }
            else
            {
                if (tbFood[username][foodid]) food = tbFood[username][foodid];
            }

            if (food)
            {
                sumCalories += parseInt(food.calories);
                
            }
            else
            {
                console.log("invalid food id requested: " + foodid);
            }
        }   
        totalCalories.push(sumCalories);
        sumCalories = 0;
        }
    }

    else {return { status: 400, content: "user not in the diet database" };}

    let data = {
        totalCalories: totalCalories,
        dates:dates
    };

    let message = "Successfully requested diet";
    console.log(message);
    return { status: 200, content: data };
}


exports.dataRequest = dataRequest;
exports.dataSubmit = dataSubmit;
exports.calorieRequest = calorieRequest;