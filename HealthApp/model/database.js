const fs = require("fs");

const files = Object.freeze({
    USERS: "model/database/users.json",
    GROUPS: "model/database/groups.json",
    FOODS: "model/database/foodoptions.json"
});

function getTable(table)
{
    const file = files[table];
    if (file) return JSON.parse(fs.readFileSync(file).toString());
    else return {error: "invalid table name"};
}

function overwriteTable(table, newTable)
{
    const file = files[table];
    if (file) fs.writeFileSync(file, JSON.stringify(newTable, null, 4));
    else return {error: "invalid table name"};
}

exports.getTable = getTable;
exports.overwriteTable = overwriteTable;