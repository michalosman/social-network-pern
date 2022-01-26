import express from 'express'
import cors from 'cors'
import errorHandler from './error/errorHandler'
import dotenv from 'dotenv'
import connectToDB from './db'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

connectToDB()
