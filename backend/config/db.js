import mongoose from "mongoose";

// function to connect to the mongodb

const connectDB = async () => {
  mongoose.connection.on("connected", () =>
    console.log("Database is connected")
  );
  await mongoose.connect(`${process.env.MONGODB_URL}/job-portal`);
};

export default connectDB;
