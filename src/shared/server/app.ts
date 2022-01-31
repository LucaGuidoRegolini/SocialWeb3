import 'express-async-errors';

import morgan from 'morgan';
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';

import { uploadConfig } from '@config/upload';
import { LoggerStream } from '@config/winston';
import { routes } from './routes';
import { globalErrorHandling } from 'errors/globalErrorHandling';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(
  morgan('combined', {
    stream: new LoggerStream(),
  }),
);

app.use(routes);

app.get('/', (_, response) => response.send('SocialWeb - 0.0.1'));

app.use((request: Request, response: Response, next: NextFunction) => {
  if (!request.route) return response.status(404).send('Rota não encontrada');
  return next();
});

app.use(globalErrorHandling);

export { server };
