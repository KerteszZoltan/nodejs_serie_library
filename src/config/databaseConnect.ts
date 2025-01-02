import dotenv from 'dotenv';

dotenv.config();


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+"@tesztapp.x43cp.mongodb.net/?retryWrites=true&w=majority&appName=tesztApp";
export const connecToMongo = async () =>{
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      await client.connect();
      const dbname=client.db('elso_teszt');
      return dbname;
    } catch (error) {
      console.error("Hiba a MongoDB kapcsolódáskor:", error);
      throw error;
    }
  }
  run().catch(console.dir);
}
