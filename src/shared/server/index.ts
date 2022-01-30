import 'reflect-metadata';
import 'dotenv/config';

import '@shared/database';
import '@shared/container';

import { server } from './app';

const port = process.env.PORT || 3333;

server.listen(port, async () => {
  /* eslint-disable no-console */
  console.log(`🚀 Server started on http://localhost:${port}`);
});
