
const fs = require("fs");

export function login(content)
{
    if (!content.username) return { status: 400, content: "Missing required data - username" };
    if (!content.password) return { status: 400, content: "Missing required data - password" };

    let db = getDB();
    if (!db[content.username]) return { status: 400, content: "Invalid username" };
    if (content.password === db[content.username].password)
    {
        //signed in, have some sort of verification token for accessing things that require being in an account
        return { status: 200, content: db[content.username].supersecretverification };
    }
}

export function signup(content)
{
    let userInfo = {
        firstname: "",
        lastname: "",
        password: "",
        height: 0,
        weight: 0,
        bmi: 0,
        age: 0,
        supersecretverification: 0
    };

    let username;

    //mandatory information for account to exist
    if (content.firstname) userInfo.firstname = content.firstname;
    else return { status: 400, content: "Missing required data - firstname" };

    if (content.lastname) userInfo.lastname = content.lastname;
    else return { status: 400, content: "Missing required data - lastname" };

    if (content.username) username = content.username;
    else return { status: 400, content: "Missing required data - username" };

    if (content.password) userInfo.password = content.password;
    else return { status: 400, content: "Missing required data - password" };

    //optional information
    if (content.height) userInfo.height = content.height;
    if (content.weight) userInfo.weight = content.weight;
    if (content.bmi) userInfo.bmi = content.bmi;
    if (content.age) userInfo.age = content.age;

    if (addUser(username, userInfo)) return { status: 201, content: "User successfully added" };
    else return { status: 400, content: "Username already taken" };
}

export function update(content)
{
    if (!content.username) return { status: 400, content: "Missing required data - username" };
    if (!content.supersecretverification) return { status: 400, content: "Missing required data - verification" };

    const u = content.username;
    let db = getDB();
    if (!checkVerification(u, content.supersecretverification)) return { status: 400, content: "Invalid verification" };

    if (content.firstname) db[u].firstname = content.firstname;
    if (content.lastname) db[u].lastname = content.lastname;
    if (content.password) db[u].password = content.password;
    if (content.height) db[u].height = content.height;
    if (content.weight) db[u].weight = content.weight;
    if (content.bmi) db[u].bmi = content.bmi;
    if (content.age) db[u].age = content.age;

    updateDB(db);

    return { status: 200, content: "Updated user info" };
}

export function dataRequest(content)
{
    if (!content.username) return { status: 400, content: "Missing required data - username" };
    if (!content.supersecretverification) return { status: 400, content: "Missing required data - verification" };
    if (!content.requestKeys) return { status: 400, content: "Missing required data - request keys" };

    let data = {};
    let db = getDB();
    const acceptedKeys = [
        "firstname",
        "lastname",
        "height",
        "weight",
        "bmi",
        "age"
    ];

    const u = content.username;
    if (!checkVerification(u, content.supersecretverification)) return { status: 400, content: "Invalid verification" };

    for (let key of content.requestKeys)
    {
        if (!acceptedKeys.includes(key)) continue;

        if (db[u][key])
        {
            data[key] = db[u][key];
        }
    }

    return { status: 200, content: data };
}


function addUser(username, userInfo)
{
    let db = getDB();

    if (db[username]) return false; //username taken, must be unique
    else
    {
        userInfo.supersecretverification = db.length;
        db[username] = userInfo;
    }

    updateDB(db);

    return true;
}

function getDB()
{
    return JSON.parse(fs.readFileSync("database/users.json").toString());
}

function updateDB(newDB)
{
    fs.writeFileSync("database/users.json", JSON.stringify(newDB));
}

function checkVerification(username, verification)
{
    const db = getDB();
    return verification === db[username].supersecretverification;
}