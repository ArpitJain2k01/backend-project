import dotenv from 'dotenv'
import connectToDB from "../src/db/database.js";

dotenv.config({
    path:'.env'
})
connectToDB()