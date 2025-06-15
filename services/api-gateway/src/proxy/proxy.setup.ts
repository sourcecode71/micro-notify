import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { Express, Response, Request } from 'express';
import { PROXY_CONFIG } from './proxy.config';

export class ProxyManager {
  static setup(app: Express) {
    PROXY_CONFIG.forEach((config) => {
      const options: Options = {
        target: config.target,
        changeOrigin: true,
        pathRewrite: config.pathRewrite,
        on: {
          proxyReq: (proxyReq, req: Request) => {
            console.log(
              `[PROXY] ${req.method} ${req.originalUrl} → ${config.target}${req.url}`,
            );
          },
          error: (err: Error, req: Request, res: Response) => {
            console.error('[PROXY ERROR]', err);
            res.status(500).json({ error: 'Proxy error' });
          },
        },
      };
      app.use(config.route, createProxyMiddleware(options));
    });
  }
}
