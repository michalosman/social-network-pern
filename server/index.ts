import express from 'express'
import cors from 'cors'
import errorHandler from './error/errorHandler'
import usersRoutes from './routes/users'
import postsRoutes from './routes/posts'
import friendsRoutes from './routes/friends'
import dotenv from 'dotenv'
import connectToDB from './db'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/users', usersRoutes)
app.use('/posts', postsRoutes)
app.use('/friends', friendsRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

connectToDB()
