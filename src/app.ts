import dns from "dns"
import url from "url"
import "dotenv/config"
import cors from "cors"
import express, { Application, Request, Response } from "express"
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
  let urlString = req.body

  const parsedUrl = url.parse(urlString.url)
  const hostName = parsedUrl.hostname

  if (!hostName) {
    res.json({ error: "Invalid Url" })
  } else {
    dns.lookup(hostName!, async (err, address) => {
      if (!address || err) {
        res.json({ error: "Invalid Url" })
      } else {
        await postWebUrl(hostName)
      }
      res.json({ original_url: urlString, short_url: 1 })
    })
  }
})

/* listener */
app.listen(port, () => console.log(`Node Server listening on port ${port}`))
