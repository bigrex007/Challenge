import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  messageId: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  readAt: Date | null;

  @Column({ default: false })
  isRead: boolean;

  @ManyToOne(() => User, (user) => user.messagesSent)
  sender: User;

  @ManyToOne(() => User, (user) => user.messagesReceived)
  receiver: User;
}
