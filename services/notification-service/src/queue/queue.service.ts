// src/queue/queue.service.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as amqp from 'amqplib';
import { config } from '../config/config.service'; // or use dotenv directly

@Injectable()
export class QueueService implements OnModuleInit {
  private readonly logger = new Logger(QueueService.name);
  private channel: amqp.Channel;
  private channelReady: Promise<void>;
  private channelReadyResolve: () => void;

  constructor() {
    this.channelReady = new Promise<void>((resolve) => {
      this.channelReadyResolve = resolve;
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      const connection = await amqp.connect(config.rabbitmqUrl);
      this.channel = await connection.createChannel();
      await this.channel.assertQueue(config.queueName, { durable: true });

      this.logger.log(`✅ Queue ready for publishing: ${config.queueName}`);
      this.channelReadyResolve(); // Now it's ready
    } catch (err) {
      this.logger.error('Failed to connect to RabbitMQ', err);
      throw err;
    }
  }

  public async publish(data: Record<string, unknown>) {
    await this.channelReady;

    if (!this.channel) {
      throw new Error('RabbitMQ channel is not initialized');
    }

    console.log('📤 Publishing message to queue:', data);

    this.channel.sendToQueue(
      config.queueName,
      Buffer.from(JSON.stringify(data)),
      { persistent: true },
    );

    this.logger.log('📤 Message published to queue');
  }
}
