import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser';

const app = express()
const port = 5105

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true 
}));
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
    res.send(req.body)
    console.log(req.body)
})

app.get('/checkout', (req, res) => {
  
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})