import dotenv from 'dotenv';
import { Db,MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();


const {  } = require('mongodb');
const uri = "mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+"@tesztapp.x43cp.mongodb.net/?retryWrites=true&w=majority&appName=tesztApp";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let database: any;

async function connect(){
    try {
      await client.connect();
      return client.db('elso_teszt');
    } catch (error) {
      console.error("MongoDB error:", error);
      throw error;
    }
  return connect()
}

function closeConnection() {
  client.close();
}

export { connect, closeConnection, database };
