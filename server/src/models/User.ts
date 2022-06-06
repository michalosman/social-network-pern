import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Post from './Post'
import Comment from './Comment'
import Friend from './Friend'

export enum UserRole {
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
}

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
    length: 100,
  })
  email: string

  @Column({
    length: 60,
  })
  password: string

  @Column({
    length: 50,
  })
  firstName: string

  @Column({ length: 50 })
  lastName: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole

  @Column({
    default: 0,
  })
  warnings: number

  @Column({
    default: false,
  })
  isBlocked: boolean

  @OneToMany(() => Post, (posts) => posts.author)
  posts: Post[]

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[]

  @OneToMany(() => Friend, (friendship) => friendship.sender)
  friends: Friend[]
}

export default User
