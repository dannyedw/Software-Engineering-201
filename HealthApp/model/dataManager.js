const userManager = require("./userManager");
const groupManager = require("./groupManager");

function request(data)
{
    if (!data.type || !data.content)
    {
        return { status: 400, content: "Invalid data request, missing type or content" };
    }

    switch (data.type)
    {
        case "user-request": return userManager.dataRequest(data.content);
        case "group-request": return groupManager.dataRequest(data.content);
        case "user-update": return userManager.update(data.content);
        case "group-create": return groupManager.create(data.content);
        case "group-delete": return groupManager.delete(data.content);
        default: //return unknown request type
    }
}

exports.request = request;