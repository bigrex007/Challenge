import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Message } from '../messaging/message.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 'user' })
  role: string;

  @Column()
  @Exclude()
  password: string;

  @Exclude()
  @Column({ nullable: true })
  passwordResetToken?: string;

  @Exclude()
  @Column({ nullable: true })
  passwordResetExpires?: Date;

  @OneToMany(() => Message, (message) => message.sender)
  messagesSent: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  messagesReceived: Message[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
