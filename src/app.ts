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

/* Header Parser */
app.get("/api/whoami", (req: Request, res: Response) => {
  res.json({
    ipaddress: req.socket.remoteAddress,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  })
})

/* URL Shortener */
app.post("/api/shorturl", (req: Request, res: Response) => {
  let urlRegex =
    /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/

  if (urlRegex.test(req.baseUrl)) return { error: "invalid url" }

  res.json({ original_url: req.baseUrl, short_url: 1 })
})

/* listener */
app.listen(port, () => console.log(`Node Server listening on port ${port}`))
