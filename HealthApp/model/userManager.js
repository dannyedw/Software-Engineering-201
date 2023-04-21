
const database = require("./database");

function login(content)
{
    if (!content.username) return { status: 400, content: "Missing required data - username" };
    if (!content.password) return { status: 400, content: "Missing required data - password" };

    const table = database.getTable("USER");
    if (!table[content.username]) return { status: 400, content: "Invalid username or password" };

    if (content.password === table[content.username].password)
    {
        return { status: 200, content: "Successfully logged in" };
    }
    else return { status: 400, content: "Invalid username or password" };
}

function signup(content)
{
    let userInfo = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        height: 0,
        weight: 0,
        bmi: 0,
        age: 0
    };

    let username;

    //mandatory information for account to exist
    if (content.firstName) userInfo.firstName = content.firstName;
    else return { status: 400, content: "Missing required data - firstname" };

    if (content.lastName) userInfo.lastName = content.lastName;
    else return { status: 400, content: "Missing required data - lastname" };

    if (content.username) username = content.username;
    else return { status: 400, content: "Missing required data - username" };

    if (content.email) userInfo.email = content.email;
    else return { status: 400, content: "Missing required data - email" };

    if (content.password) userInfo.password = content.password;
    else return { status: 400, content: "Missing required data - password" };

    //optional information
    if (content.height) userInfo.height = content.height;
    if (content.weight) userInfo.weight = content.weight;
    if (content.bmi) userInfo.bmi = content.bmi;
    if (content.age) userInfo.age = content.age;

    return addUser(username, userInfo);
}

function update(username, content)
{
    let table = database.getTable("USER");

    if (content.firstName) table[username].firstName = content.firstName;
    if (content.lastName) table[username].lastName = content.lastName;
    if (content.email) table[username].email = content.email;
    if (content.password) table[username].password = content.password;
    if (content.height) table[username].height = content.height;
    if (content.weight) table[username].weight = content.weight;
    if (content.bmi) table[username].bmi = content.bmi;
    if (content.age) table[username].age = content.age;

    database.overwriteTable("USER", table);

    return { status: 200, content: "Updated user info" };
}

function dataRequest(username, content)
{
    if (!content.requestKeys) return { status: 400, content: "Missing required data - request keys" };

    let data = {};
    let table = database.getTable("USER");
    const acceptedKeys = [
        "firstName",
        "lastName",
        "height",
        "weight",
        "bmi",
        "age"
    ];

    for (let key of content.requestKeys)
    {
        if (acceptedKeys.includes(key))
        {
            try{
                data[key] = table[username][key];
            }
            catch{
                data[key] = "INVALID KEY";
            }
        }
        else
        {
            data[key] = "INVALID KEY";
        }
    }

    return { status: 200, content: data };
}


function addUser(username, userInfo)
{
    let table = database.getTable("USER");

    if (table[username]) return { status: 400, content: "Username already taken" };

    for (let k in table)
    {
        if (table[k].email === userInfo.email) return { status: 400, content: "Email already taken" };
    }
    
    table[username] = userInfo;
    database.overwriteTable("USER", table);

    return { status: 201, content: "User successfully added" };
}

exports.login = login;
exports.signup = signup;
exports.update = update;
exports.dataRequest = dataRequest;