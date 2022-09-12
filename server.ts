import "dotenv/config"
import cors from "cors"
import Stripe from "stripe"
import mongoose from "mongoose"
import express, { json } from "express"

const app = express()
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!, {
  apiVersion: "2022-08-01",
})

app.use(json())
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
)

const connectionString = `${process.env.DB_SRV}`
mongoose
  .connect(connectionString)
  .then((result: any) => {
    console.log("Connected on port 5105"), app.listen(5105)
  })
  .catch((error: Error) => console.log(error))

// app.all("/adduser", (req: any, res: any) => {
//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   })

//   user
//     .save()
//     .then((result: typeof json) => {
//       res.send(result)
//     })
//     .catch((error: string) => {
//       console.log(error)
//     })
// })

const storeItems = new Map([[1, { priceInCents: 1000, name: "Basket" }]])

app.post("/checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item: any) => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "gbp",
            product_data: {
              name: storeItem!.name,
            },
            unit_amount: storeItem!.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.CLIENT_URL}/`,
      cancel_url: `${process.env.CLIENT_URL}/`,
    })
    res.json({ url: session.url })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})
