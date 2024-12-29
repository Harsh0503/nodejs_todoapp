import mongoose from "mongoose";

export const connectDB = () => {mongoose.connect("mongodb://localhost:27017",{
    dbName:"backendapi"
})
.then(() => console.log("Database Connected"))
.catch((e) => console.log(e))}