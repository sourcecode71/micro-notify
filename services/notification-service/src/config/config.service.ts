import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  rabbitmqUrl: process.env.RABBITMQ_URL!,
  queueName: process.env.QUEUE_NAME!,
  smtp: {
    host: process.env.SMTP_HOST!,
    port: +process.env.SMTP_PORT!,
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
};
