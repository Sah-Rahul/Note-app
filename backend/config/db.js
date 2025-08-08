import mongoose from "mongoose";


export const ConnectDb = async () =>{
  try {
      await mongoose.connect(process.env.MONGO_URI);
       console.log("db is connected");
  } catch (error) {
     console.log("db is faild !");
  }
}