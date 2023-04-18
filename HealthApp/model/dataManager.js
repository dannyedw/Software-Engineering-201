const userManager = require("./userManager");
const groupManager = require("./groupManager");
const exerciseManager = require("./exerciseManager");

function request(username, data)
{
    if (!data.type || !data.content)
    {
        return { status: 400, content: "Invalid data request, missing type or content" };
    }

    switch (data.type)
    {
        case "user-request": return userManager.dataRequest(username, data.content);
        case "group-request": return groupManager.dataRequest(username, data.content);
        case "exercise-request": return exerciseManager.dataRequest(username, data.content);
        case "user-update": return userManager.update(username, data.content);
        case "group-create": return groupManager.create(username, data.content);
        case "group-delete": return groupManager.delete(username, data.content);
        default: return { status: 400, content: "Invalid request type" };
    }
}

exports.request = request;