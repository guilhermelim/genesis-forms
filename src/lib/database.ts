import { MONGODB_URI } from "@/config";
import mongoose from "mongoose";

class Database {
  private static instance: Database;
  private connection: typeof mongoose | null = null;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect() {
    if (this.connection) {
      return this.connection;
    }

    try {
      this.connection = await mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
      });
      console.log("Connected to database!");
      return this.connection;
    } catch (error) {
      this.connection = null;
      throw error;
    }
  }

  public async close() {
    if (this.connection) {
      await mongoose.connection.close();
      this.connection = null;
    }
  }

  public getConnectionStatus() {
    return mongoose.connection.readyState;
  }
}

export default Database.getInstance();
