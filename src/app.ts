import "dotenv/config"
import cors from "cors"
import express, { Application, Request, Response } from "express"

/* config */
const app: Application = express()
const port = process.env.PORT || 4000

/* cors */
app.use(cors({ origin: "*" }))
app.use(express.json())

/* routes */
app.get("/", (req: Request, res: Response) => {
  res.send("TS-Node Server")
})

/* listener */
app.listen(port, () => {
  console.log(`Node Server listening on port ${port}`)
})
