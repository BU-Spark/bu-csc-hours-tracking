import express, { Request, Response } from 'express';
import next from 'next';
import session from 'express-session';
import { createProxyMiddleware } from 'http-proxy-middleware';
// import { API_URL } from '@/constants';

const API_URL = process.env.API_URL

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  console.log('API_URL:', API_URL)

  server.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: false,
  }));

  server.use('/api/auth', createProxyMiddleware({
    target: 'https://bu-csc-dev.netlify.app',
    changeOrigin: true,
    pathRewrite: {
      '^/api/auth': '/api/auth'
    },
  }));

  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
