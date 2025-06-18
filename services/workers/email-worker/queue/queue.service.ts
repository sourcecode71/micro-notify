/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
  Logger,
} from '@nestjs/common';
import * as amqp from 'amqplib';
import { config } from '../config/config.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class QueueService implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(QueueService.name);
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  constructor(private readonly mailService: MailService) {}

  async onModuleInit(): Promise<void> {
    await this.initializeQueue();
  }

  private async initializeQueue(): Promise<void> {
    try {
      const connection = await amqp.connect(config.rabbitmqUrl);
      const channel = await connection.createChannel();

      await channel.assertQueue(config.queueName, { durable: true });

      this.connection = connection;
      this.channel = channel;

      this.logger.log(`✅ Listening on queue: ${config.queueName}`);

      channel.consume(config.queueName, (msg) => this.processMessage(msg), {
        noAck: false,
      });

      connection.on('close', () => {
        this.logger.warn(
          '🔌 RabbitMQ connection closed. Attempting to reconnect...',
        );
        setTimeout(() => {
          void this.initializeQueue();
        }, 5000);
      });

      connection.on('error', (err) => {
        this.logger.error(
          '🐞 RabbitMQ connection error:',
          err instanceof Error ? err.message : err,
        );
      });
    } catch (error) {
      const err =
        error instanceof Error ? error : new Error('Unknown connection error');
      this.logger.error('❌ Failed to initialize queue connection:', err.stack);
      throw err;
    }
  }

  private async processMessage(msg: amqp.ConsumeMessage | null): Promise<void> {
    if (!msg || !this.channel) return;

    try {
      const contentStr =
        typeof msg.content === 'string'
          ? msg.content
          : (msg.content?.toString?.() ?? '');
      const payload = this.validateMessageContent(contentStr);

      await this.mailService.sendEmail(
        payload.to,
        payload.subject,
        payload.html,
      );
      this.logger.log(`📧 Email sent to ${payload.to}`);

      this.safeAck(msg);
    } catch (error) {
      const err =
        error instanceof Error ? error : new Error('Unknown processing error');
      this.logger.error('❌ Failed to process message:', err.stack);
      this.safeNack(msg);
    }
  }

  private validateMessageContent(content: string): {
    to: string;
    subject: string;
    html: string;
  } {
    try {
      const payload = JSON.parse(content);
      if (
        typeof payload.to !== 'string' ||
        typeof payload.subject !== 'string' ||
        typeof payload.html !== 'string'
      ) {
        throw new Error('Invalid message format');
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return payload;
    } catch (error) {
      throw new Error(`Message validation failed: ${(error as Error).message}`);
    }
  }

  private safeAck(msg: amqp.ConsumeMessage): void {
    try {
      if (!this.channel) {
        this.logger.warn('⚠️ Cannot ACK: channel is null');
        return;
      }

      if (this.channel.connection?.stream?.destroyed) {
        this.logger.warn('⚠️ Cannot ACK: channel stream destroyed');
        return;
      }

      this.channel.ack(msg);
      this.logger.log(`✅ ACK sent for deliveryTag: ${msg.fields.deliveryTag}`);
    } catch (err) {
      this.logger.error('❌ Failed to ACK message:', err);
    }
  }

  private safeNack(msg: amqp.ConsumeMessage): void {
    try {
      if (!this.channel) {
        this.logger.warn('⚠️ Cannot NACK: channel is null');
        return;
      }

      if (this.channel.connection?.stream?.destroyed) {
        this.logger.warn('⚠️ Cannot NACK: channel stream destroyed');
        return;
      }

      this.channel.nack(msg, false, false); // do not requeue
      this.logger.warn(
        `🚫 NACK sent for deliveryTag: ${msg.fields.deliveryTag}`,
      );
    } catch (err) {
      this.logger.error('❌ Failed to NACK message:', err);
    }
  }

  async onApplicationShutdown(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
        this.logger.log('🛑 RabbitMQ channel closed');
      }
      if (this.connection) {
        await this.connection.close();
        this.logger.log('🛑 RabbitMQ connection closed');
      }
    } catch (error) {
      const err =
        error instanceof Error ? error : new Error('Unknown shutdown error');
      this.logger.error('❌ Error on shutdown:', err.stack);
    }
  }
}
