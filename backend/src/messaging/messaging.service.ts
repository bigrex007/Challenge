import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './message.entity';
import { Repository, MoreThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import callAPI from 'src/api/callAPI';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepo: Repository<Message>,
    private usersService: UsersService,
  ) {}

  async getMessagesBetweenUsers(userId: string, otherUserId: string) {
    const messages = await this.messagesRepo
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.receiver', 'receiver')
      .where(
        '(sender.userId = :userId AND receiver.userId = :otherUserId) OR (sender.userId = :otherUserId AND receiver.userId = :userId)',
        { userId, otherUserId },
      )
      .orderBy('message.createdAt', 'ASC')
      .getMany();

    return messages;
  }

  async createMessage(senderId: string, receiverId: string, content: string) {
    const sender = await this.usersService.findOne(senderId);
    const receiver = await this.usersService.findOne(receiverId);

    if (!sender || !receiver) {
      throw new NotFoundException('Sender or receiver not found');
    }

    const message = this.messagesRepo.create({
      sender,
      receiver,
      content,
    });

    await this.messagesRepo.save(message);

    setTimeout(
      async () => {
        const hasResponded = await this.hasUserResponded(
          receiverId,
          senderId,
          message.createdAt,
        );

        if (!hasResponded) {
          try {
            await callAPI.post(
              'http://localhost:3500/notifications/send-email',
              {
                email: receiver.email,
                subject: 'You have a new message',
                content: `
                <p>Hello ${receiver.username},</p>
                <p>You have received a new message from ${sender.username}:</p>
                <p>"${content}"</p>
                <p>Please log in to your account to reply.</p>
              `,
              },
            );
          } catch (error) {
            console.error('Error sending email notification:', error);
          }
        }
      },
      1 * 15 * 1000,
    );

    return message;
  }

  async hasUserResponded(
    senderId: string,
    receiverId: string,
    since: Date,
  ): Promise<boolean> {
    const count = await this.messagesRepo.count({
      where: {
        sender: { userId: senderId },
        receiver: { userId: receiverId },
        createdAt: MoreThan(since),
      },
    });
    return count > 0;
  }

  async markConversationAsRead(userId: string, otherUserId: string) {
    const result = await this.messagesRepo.update(
      {
        sender: { userId: otherUserId },
        receiver: { userId },
        isRead: false,
      },
      {
        isRead: true,
        readAt: new Date(),
      },
    );

    if (result.affected === 0) {
      return { success: false };
    }

    return { success: true, updatedCount: result.affected };
  }

  async getUserConversations(userId: string) {
    const messages = await this.messagesRepo.find({
      where: [{ sender: { userId } }, { receiver: { userId } }],
      relations: ['sender', 'receiver'],
      order: { createdAt: 'DESC' },
    });

    const conversationsMap = new Map<string, Message>();

    for (const message of messages) {
      const otherUserId =
        message.sender?.userId === userId
          ? message.receiver?.userId
          : message.sender?.userId;

      if (otherUserId && !conversationsMap.has(otherUserId)) {
        conversationsMap.set(otherUserId, message);
      }
    }

    const conversations = Array.from(conversationsMap.values());
    const conversationDtos = await Promise.all(
      conversations.map(async (message) => {
        const otherUser =
          message.sender?.userId === userId ? message.receiver : message.sender;

        const otherUserId = otherUser?.userId;
        const otherUsername = otherUser ? otherUser.username : 'Deleted User';
        const unreadCount = otherUserId
          ? await this.messagesRepo.count({
              where: {
                sender: { userId: otherUserId },
                receiver: { userId },
                isRead: false,
              },
            })
          : 0;
        return {
          otherUserId: otherUserId || 'Unknown',
          otherUsername,
          contentPreview: message.content,
          createdAt: message.createdAt,
          unreadCount,
        };
      }),
    );
    return conversationDtos;
  }
}
