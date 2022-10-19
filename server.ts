import "dotenv/config"
import cors from "cors"
import axios from "axios"
import mysql from "mysql"
import mongoose from "mongoose"
import express, { json } from "express"

/* config */
const app = express()
const port = 5001

/* cors */
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
)

app.use(express.json())

/* routes */
app.post("/login", (req, res) => {
    let body = req.body
    console.log(body)
})

/* listener */
app.listen(port, () => {
    console.log(`T and A listening on port ${port}`)
})
