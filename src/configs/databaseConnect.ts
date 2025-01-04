import dotenv from 'dotenv';
import { Db,MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const mongoose = require('mongoose');
const uri = "mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+"@tesztapp.x43cp.mongodb.net/MovieDiary?retryWrites=true&w=majority&appName=tesztApp";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export async function Connect() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db;
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}

export async function CloseConnect() {
  try {
    await mongoose.connection.close();
    console.log("Closed the connection to MongoDB!");
  }catch (error) {
    console.error("Error closing the connection to MongoDB: ", error);
  }
}
