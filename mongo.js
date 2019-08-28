const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
let newdb
const connectDB = async (callback) => {
   try {
       MongoClient.connect(url, (err, db) => {
           newdb = db
           return callback(err)
       })
   } catch (err) {
       throw err
   }
}
const getDB = () => newdb.db('myDatabase')
const disconnectDB = () => newdb.close()
module.exports = { connectDB, getDB, disconnectDB }
