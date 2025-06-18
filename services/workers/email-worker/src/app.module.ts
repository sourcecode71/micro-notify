import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueService } from '../queue/queue.service';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [], // ✅ leave this empty or add valid modules only
  controllers: [AppController],
  providers: [AppService, QueueService, MailService], // ✅ correct usage
})
export class AppModule {}
