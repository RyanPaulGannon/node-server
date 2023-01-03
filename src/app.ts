import dns from "dns"
import url from "url"
import "dotenv/config"
import cors from "cors"
import express, { Application, Request, Response } from "express"
import { connect } from "./database/connect"
import {
  checkIfUrlExists,
  getUrlData,
  getUrlIdData,
  postUrlData,
} from "./database/urlShortener"
import {
  addExerciseData,
  checkIfUserExists,
  createUser,
  findUserByUsername,
  findUserById,
  getAllUsers,
  findExerciseLog,
} from "./database/exerciseTracker"

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
  const parsedUrl = url.parse(req.body.url)
  const hostName = parsedUrl.hostname
  const href = parsedUrl.href
  let id: number

  if (!hostName) {
    res.json({ error: "Invalid Url" })
  } else {
    dns.lookup(hostName!, async (err, address) => {
      if (!address || err) {
        res.json({ error: "Invalid Url" })
      } else {
        const doesUrlExist = await checkIfUrlExists(href)

        if (!doesUrlExist) {
          await postUrlData(href)
          const data: any = await getUrlData(href)
          if (data) id = data.id
        } else {
          const data: any = await getUrlData(href)
          if (data) id = data.id
        }
        res.json({ original_url: href, short_url: id })
      }
    })
  }
})

app.get("/api/shorturl/:id", async (req: Request, res: Response) => {
  const id = req.params.id

  const dbId = await getUrlIdData(id)

  if (!id) {
    res.json({ error: "Invalid Url" })
  } else {
    if (dbId) {
      res.redirect(dbId.url)
    }
  }
})

/* Exercise Tracker */
app.get("/api/users", async (req: Request, res: Response) => {
  const users = await getAllUsers()
  res.json(users)
})

app.post("/api/users", async (req: Request, res: Response) => {
  let username = req.body.username

  if (!username) res.send("No user entered")

  const doesUserExist = await checkIfUserExists(username)

  if (!doesUserExist) await createUser(username)

  const user = await findUserByUsername(username)

  if (user) {
    return res.json({ username: user.username, _id: user.id })
  } else {
    res.send("Invalid")
  }
})

app.post("/api/users/:_id/exercises", async (req: Request, res: Response) => {
  let { description, duration, date } = req.body
  let id = req.params._id

  const user = await findUserById(id)

  if (!user) res.send("No user found")

  if (!date) {
    date = new Date()
  } else {
    new Date(date)
  }

  await addExerciseData(description, Number(duration), date, id)

  res.json({
    _id: id,
    username: user?.username,
    date: date.toDateString(),
    duration: Number(duration),
    description,
  })
})

// app.get("/api/users/:_id/logs", async (req: Request, res: Response) => {
//   const userId = req.params._id
//   const user = await findUserById(userId)

//   if (!user) res.json({ message: "User not found" })

//   const exercises = await findExerciseLog(userId)

//   res.json({ username: user?.username, exercises: exercises })
// })

/* listener */
app.listen(port, () => console.log(`Node Server listening on port ${port}`))
