import express from 'express';
import cors from 'cors';
import requestLoggerMiddleware from './requestLogger.middleware';
import todoRouter from './todo.controller';
import swaggerUi from 'swagger-ui-express';

console.log('hello from typescript!');

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLoggerMiddleware);
app.use(todoRouter);

// app.use('/api-docs', swaggerUi.serve);

export { app };