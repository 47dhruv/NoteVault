import express ,{json} from "express"
import cors from "cors"
import noteRouter from "./routes/note.routes.js"


const app= express()

app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(json())


app.use("/api/v1/note",noteRouter)

export default app

