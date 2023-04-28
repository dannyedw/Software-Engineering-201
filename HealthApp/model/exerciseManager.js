
const database = require("./database");

function dataRequest(username, content)
{
    if (!content.date) return { status: 400, content: "Missing required data - date" };
    
    const table = database.getTable("EXERCISE");
    let data = [];
    
    if(table[username] && table[username][content.date])
    {
        data = table[username][content.date];
    }

    let message = "Successfully requested exercise";
    console.log(message);
    return { status: 200, content: data };
}

function dataSubmit(username, content)
{
    if (!content.date) return { status: 400, content: "Missing required data - date" };
    if (!content.set) return { status: 400, content: "Missing required data - set" };
    if (!content.name) return { status: 400, content: "Missing required data - name" };
    if (!content.time) return { status: 400, content: "Missing required data - time" };
    if (!content.amount) return { status: 400, content: "Missing required data - amount" };

    let data = {
        set: content.set,
        name: content.name,
        time: content.time,
        amount: content.amount
    };

    let table = database.getTable("EXERCISE");
    if (table[username])
    {
        if (table[username][content.date])
        {
            table[username][content.date].push(data);
        }
        else
        {
            table[username][content.date] = [data];
        }
    }
    else
    {
        table[username] = {};
        table[username][content.date] = [data];
    }

    database.overwriteTable("EXERCISE", table);

    let message = "Successfully added exercise";
    console.log(message);
    return { status: 200, content: message };
}


exports.dataRequest = dataRequest;
exports.dataSubmit = dataSubmit;