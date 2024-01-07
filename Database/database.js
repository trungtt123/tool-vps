const helper = require('../Action/Helper/helper');
const { CONFIG_ROOT } = require('../const');

const DATABASE_URL = __dirname + "\\database.txt";
async function getData(){
    try {
        console.log(DATABASE_URL);
        let database = await helper.readFileAsync(DATABASE_URL);
        if (!database) database = {};
        else database = JSON.parse(database);
        return database;
    }
    catch(e){
        return {};
    }
}
async function updateData(newDatabase){
    helper.overwriteFile(DATABASE_URL, JSON.stringify(newDatabase));
}
module.exports = {
    getData,
    updateData
};