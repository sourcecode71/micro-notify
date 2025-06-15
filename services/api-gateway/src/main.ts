import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Express } from 'express';
import { ProxyManager } from './proxy/proxy.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = app.getHttpAdapter().getInstance() as Express;

  // Initialize proxies
  ProxyManager.setup(expressApp);

  await app.listen(3001, () => {
    console.log(`
    🚀 Proxy Server Running at http://localhost:3001
    ├─ Notifications: /api/notifications/**
    ├─ Webhooks: /api/webhooks/**
    └─ Logs: /api/logs/**
    `);
  });
}
bootstrap();
