import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Post from './Post'
import User from './User'

@Entity('comments')
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 255,
  })
  text: string

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => User, (user) => user.comments)
  author: User

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Post
}

export default Comment
