interface ProxyRoute {
  route: string;
  target: string;
  pathRewrite?: Record<string, string>;
}

export const PROXY_CONFIG: ProxyRoute[] = [
  // Notifications endpoints
  {
    route: '/api/notifications',
    target: 'http://localhost:3000/api/notifications',
  },
  {
    route: '/api/notifications/history',
    target: 'http://localhost:3000/api/notifications/history',
  },
  {
    route: '/api/notifications/bulk',
    target: 'http://localhost:3000/api/notifications/bulk',
  },
  {
    route: '/api/notifications/:id',
    target: 'http://localhost:3000/api/notifications/:id',
  },

  // Webhooks endpoints
  {
    route: '/api/webhooks',
    target: 'http://localhost:3000/api/webhooks',
  },

  // Logs endpoints
  {
    route: '/api/logs',
    target: 'http://localhost:3000/api/logs',
  },
  {
    route: '/api/logs/:id',
    target: 'http://localhost:3000/api/logs/:id',
  },
];
