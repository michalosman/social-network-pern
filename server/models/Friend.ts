import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'

@Entity('friends')
export class Friend extends BaseEntity {
  @PrimaryColumn()
  senderId: number

  @PrimaryColumn()
  receiverId: number

  @ManyToOne(() => User, (user) => user.friends)
  sender: number

  @ManyToOne(() => User, (user) => user.friends)
  receiver: number

  @Column({
    default: false,
  })
  isApproved: boolean
}
