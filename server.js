import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express()
const port = 5105

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/checkout', (req, res) => {
    console.log('Post successful')
    console.log(req.formData)
    res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})