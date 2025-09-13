import mongoose from "mongoose";

let connected = false;
let host: string | null = null;

const connectDB = async () => {
  if (connected) {
    console.log(`Database successfully connected: ${host}`);
    return;
  }
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    console.log("Insert MONGO_URI at .env file.");
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(MONGO_URI);
    host = conn.connection.host;
    console.log(`Database successfully Connected: ${host}`);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "With unknown Error";
    console.log(`Failed to connect database, ${message}`);
    process.exit(1);
  }
};
export default connectDB;