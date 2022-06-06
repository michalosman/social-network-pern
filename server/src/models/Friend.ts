import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import User from './User'

@Entity('friends')
class Friend extends BaseEntity {
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

export default Friend
