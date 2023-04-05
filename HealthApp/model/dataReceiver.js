
const userManager = require("../model/userManager");
const groupManager = require("../model/groupManager");

function process(data)
{
    const type = data.type;
    const content = data.content;

    if (!type || !content)
    {
        return { status: 400, content: "Invalid data submission, missing type or content" };
    }

    switch (type)
    {
        case "user-login": return userManager.login(content);
        case "user-signup": return userManager.signup(content);
        case "user-update": return userManager.update(content);
        case "user-data-request": return userManager.dataRequest(content);
        case "group-create": return groupManager.create(content);
        case "group-delete": return groupManager.delete(content);
        case "group-data-request": return groupManager.dataRequest(content);
        default: //return unknown request type
    }
}

exports.process = process;