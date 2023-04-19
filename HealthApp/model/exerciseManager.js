
const database = require("./database");

function dataRequest(username, content)
{
    if (!content.date) return { status: 400, content: "Missing required data - date" };
    
    let table = database.getTable("EXERCISES");
    let data = [];
    
    if(table[username][content.date])
    {
        data = table[username][content.date];
    }

    return { status: 200, content: data };
}

function dataSubmit(username, content)
{
    
}


exports.dataRequest = dataRequest;