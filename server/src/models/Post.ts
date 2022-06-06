import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import User from './User'
import Comment from './Comment'

@Entity('posts')
class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 255,
  })
  text: string

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => User, (user) => user.posts)
  author: User

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[]

  @ManyToMany(() => User)
  @JoinTable({
    name: 'likes',
    joinColumn: {
      name: 'postId',
    },
    inverseJoinColumn: {
      name: 'userId',
    },
  })
  likes: User[]
}

export default Post
