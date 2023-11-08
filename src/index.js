import dotenv from 'dotenv'
import {app} from './app.js'
import connectToDB from "../src/db/database.js";

dotenv.config({
    path:'.env'
})
connectToDB()
.then(()=>{


    app.on('error',(error)=>{
        console.log("Error: ",error)
        throw error;
    })

    app.listen( process.env.PORT || 8000, ()=>{
        console.log(`App is listening at port: ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("MONGODB connection failed ",error);
})