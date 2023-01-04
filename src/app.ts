import "dotenv/config"
import cors from "cors"
import express, { Application, Request, Response } from "express"
import { connect } from "./database/connect"

/* config */
const app: Application = express()
const port = process.env.PORT || 4000

/* cors */
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* routes */
app.get("/", (req: Request, res: Response) => {
  res.send("TypeScript boilerplate Azure Web Apps")
})

/* database */
connect()

/* listener */
app.listen(port, () => console.log(`Node Server listening on port ${port}`))
