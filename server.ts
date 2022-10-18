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

/* mysql */
// let connection = mysql.createConnection({
//     host: "localhost",
//     user: "me",
//     password: "secret",
//     database: "my_db",
// })

// connection.connect()

// connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
//     if (error) throw error
//     console.log("The solution is: ", results[0].solution)
// })

// connection.end()

/* routes */
app.post("/login", (req, res) => {
    let body = req.body
    console.log(body)
})

/* listener */
app.listen(port, () => {
    console.log(`T and A listening on port ${port}`)
})
