const mongodb = require("mongodb");
const dbName = "data";
const dbUrl = `mongodb+srv://mani143tech:mani4213@cluster0.ckxmigv.mongodb.net/${dbName}`;
const MongoClient = mongodb.MongoClient;
module.exports = { mongodb, dbName, dbUrl, MongoClient };
