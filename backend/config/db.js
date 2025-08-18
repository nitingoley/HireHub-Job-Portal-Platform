import mongoose from "mongoose";

// function to connect to the mongodb

// const connectDB = async () => {
//   mongoose.connection.on("connected", () =>
//     console.log("Database is connected")
//   );
//   await mongoose.connect(`mongodb+srv://nitingoley42:jobport@cluster0.lm1a4kw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
// };


const connectDB = async ()=>{
  await mongoose.connect('mongodb+srv://nitingoley42:jobport@cluster0.lm1a4kw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(()=>  console.log("Database is connected 1")
  )
  .catch((er)=> console.log("Database is not connect" , er)
  )
}
export default connectDB;
