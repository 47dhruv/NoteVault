import express, { json } from "express"
import cors from "cors"
import noteRouter from "./routes/note.routes.js"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.route.js"


const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())



app.use("/api/v1/note", noteRouter)
app.use("/api/v1/user", userRouter)

export default app

