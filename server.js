require("dotenv").config()

const cors = require("cors")
const express = require("express")
const bodyParser = require("body-parser")

const app = express()

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

app.post('/checkout', (req, res) => {
    res.send(req.body)
    console.log(req.body)
})

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
  [1, { priceInCents: 1000, name: 'Test One'}],
  [2, { priceInCents: 2000, name: 'Test Two'}]
])

app.post('/checkout-session', async (req, res) => {
  try {
    const session = stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: 'eur',
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(5105)