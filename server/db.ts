import { User } from './models/User'
import { Post } from './models/Post'
import { Comment } from './models/Comment'
import { createConnection } from 'typeorm'

import dotenv from 'dotenv'
dotenv.config()

const connectToDB = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT || '5432'),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [User, Post, Comment],
      synchronize: true, //! remove in prod
    })
    console.log('Connected to PostgreSQL')
  } catch (error) {
    console.log(`Unable to connect to PostgreSQL (${error.message}) `)
  }
}

export default connectToDB
