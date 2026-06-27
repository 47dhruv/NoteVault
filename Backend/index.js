import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
dotenv.config()
const port=process.env.PORT||8000

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log(`express connection failed`,error)


    })
    app.listen(port,()=>{
     console.log(`app is listeing on http://localhost:${port}`)
   })
})
.catch((error)=>{
    console.log(`mongodb connectio is failed !!!`,error)
})












