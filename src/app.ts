import 'dotenv/config'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { connect } from './database/connect'
import { prisma } from './database/client'

/* config */
const app: Application = express()
const port = process.env.PORT || 4000

/* cors */
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* routes */
app.get('/', (req: Request, res: Response) => {
  res.send('TypeScript boilerplate Azure Web Apps & Docker')
})

/* database */
connect()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

/* listener */
app.listen(port, () =>
  console.log(`Node Server listening on port ${port} with Docker`)
)
