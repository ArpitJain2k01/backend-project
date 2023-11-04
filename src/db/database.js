import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

 const connectToDB= async ()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`\n MongoDB Connected!! \n DB HOST: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.error("ERROR : Connect to db :", error)
        process.exit(1)
    }
}
export default connectToDB;