import { MONGO_URL } from "$env/static/private";
import { MongoClient } from "mongodb";

let client = new MongoClient(MONGO_URL);
let clientPromise = client.connect();

export default clientPromise;
