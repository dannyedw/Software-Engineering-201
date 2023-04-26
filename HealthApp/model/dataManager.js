const userManager = require("./userManager");
const groupManager = require("./groupManager");
const exerciseManager = require("./exerciseManager");
const dietManager = require("./dietManager");
const foodManager = require("./foodManager");
const personalGoalsManager = require("./personalGoalsManager")

function request(username, data)
{
    if (!data.type || !data.content)
    {
        return { status: 400, content: "Invalid data request, missing type or content" };
    }
    switch (data.type)
    {
        case "user-request": return userManager.dataRequest(username, data.content);
        case "user-update": return userManager.update(username, data.content);
        case "exercise-request": return exerciseManager.dataRequest(username, data.content);
        case "exercise-submit": return exerciseManager.dataSubmit(username, data.content);
        case "diet-request": return dietManager.dataRequest(username, data.content);
        case "diet-submit": return dietManager.dataSubmit(username, data.content);
        case "food-request": return foodManager.dataRequest(username);
        case "food-submit": return foodManager.dataSubmit(username, data.content);
        case "group-request": return groupManager.dataRequest(username, data.content);
        case "group-create": return groupManager.create(username, data.content);
        case "group-delete": return groupManager.delete(username, data.content);
        case "personal-goal-create": return personalGoalsManager.create(username, data.content);
        case "personal-goal-update": return personalGoalsManager.update(username, data.content);
        case "personal-goal-request": return personalGoalsManager.dataRequest(username, data.content);
        case "personal-goal-delete": return personalGoalsManager.deleteGoal(username, data.content);
        default: return { status: 400, content: "Invalid request type" };
    }
}

exports.request = request;