import { PrismaClient } from '@prisma/client';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes';

const prisma = new PrismaClient()
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(bodyParser.json());

// A `main` function so that you can use async/await
async function main() {
  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
    app.use('/', routes);
  });
}


main()
  .catch(e => { console.error(e); })
  .finally(async () => {  await prisma.$disconnect() })
  
