const fs = require("fs");

const files = Object.freeze({
    USER: "model/database/user.json",
    GROUP: "model/database/group.json",
    FOOD: "model/database/food.json",
    EXERCISE: "model/database/exercise.json",
    DIET: "model/database/diet.json",
    PERSONALGOALS: "model/database/personalGoals.json"
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