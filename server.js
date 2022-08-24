import {} from 'dotenv/config'
import cors from 'cors'
import Stripe from 'stripe'
import mongoose from 'mongoose'
import express, { json } from 'express'

const app = express()
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

app.use(json())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

const connectionString = `${process.env.DB_SRV}`
mongoose.connect(connectionString)
  .then((result) => {console.log('Connected'), app.listen(5105)})
  .catch((err) => console.log(err))


  app.all('/adduser', (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
  
    user.save()
      .then((result) => {
        res.send(result)
      })
      .catch((err) => {
        console.log(err)
      })
  })

const storeItems = new Map([
  [1, { priceInCents: 1000, name: 'Basket '}],
])

app.post('/checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.CLIENT_URL}/`,
      cancel_url: `${process.env.CLIENT_URL}/`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})