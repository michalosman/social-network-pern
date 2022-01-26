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
import { User } from './User'
import { Comment } from './Comment'

@Entity('posts')
export class Post extends BaseEntity {
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
      name: 'chatId',
    },
    inverseJoinColumn: {
      name: 'userId',
    },
  })
  likes: User[]
}
