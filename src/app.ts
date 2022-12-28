import "dotenv/config"
import cors from "cors"
import express, { Application, Request, Response, urlencoded } from "express"
import { connect } from "./database/connect"
import { postWebUrl } from "./database/postUrl"

/* config */
const app: Application = express()
const port = process.env.PORT || 4000

/* cors */
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* routes */
app.get("/", (req: Request, res: Response) => {
  res.sendFile(process.cwd() + "/src/views/index.html")
})

/* database */
connect()

/* Header Parser */
app.get("/api/whoami", (req: Request, res: Response) => {
  res.json({
    ipaddress: req.socket.remoteAddress,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  })
})

/* URL Shortener */
app.post("/api/shorturl", async (req: Request, res: Response) => {
  let { url } = req.body

  await postWebUrl(url)

  let urlRegex =
    /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/

  // if (urlRegex.test(req.baseUrl)) return { error: "invalid url" }

  res.json({ original_url: url, short_url: 1 })
})

/* listener */
app.listen(port, () => console.log(`Node Server listening on port ${port}`))
