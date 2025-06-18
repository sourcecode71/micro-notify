import { INotificationStrategy } from '../../domain/interfaces/notification-strategy.interface';
import { Notification } from '../../domain/entities/notification.entity';
import { QueueService } from '../../../queue/queue.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailNotificationStrategy implements INotificationStrategy {
  constructor(private readonly queueService: QueueService) {
    if (!queueService) {
      throw new Error('QueueService is required for EmailNotificationStrategy');
    }
    console.log(
      'EmailNotificationStrategy initialized with QueueService:',
      this.queueService,
    );
  }

  async send(notification: Notification): Promise<void> {
    const payload = {
      to: notification.recipient,
      subject: notification.subject,
      html: notification.body,
    };

    console.log(
      'Sending email notification via QueueService:',
      this.queueService,
    );

    // eslint-disable-next-line @typescript-eslint/await-thenable
    await this.queueService.publish(payload); // Delegate to QueueService
  }
}
