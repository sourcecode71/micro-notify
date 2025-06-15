// src/proxy/notification.proxy.ts
import { createProxyMiddleware } from 'http-proxy-middleware';

export const notificationProxy = createProxyMiddleware({
  target: 'http://localhost:3001', // notification-service address
  changeOrigin: true,
  pathRewrite: { '^/api/notifications': '' },
});

export const webhookProxy = createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: { '^/api/webhooks': '' },
});
