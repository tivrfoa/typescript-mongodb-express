import express from 'express';
import cors from 'cors';
import * as bodyparser from 'body-parser';
import requestLoggerMiddleware from './requestLogger.middleware';

console.log('hello from typescript!');

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(requestLoggerMiddleware);

app.get('/todo', (req, resp) => {
    console.log('req.query', req.query);

    resp.json([{
        id: 1,
        description: 'Buy Bread'
    }])
});

app.post('/todo', (req, resp) => {
    console.log('todo POST');
    console.info(req.body);
    resp.end();
});

app.put('/todo/:id', (req, resp) => {
    console.log('todo PUT');
    console.info(req.params.id);
    resp.end();
});

app.delete('/todo/:id', (req, resp) => {
    console.log('todo DELETE');
    console.info(req.params.id);
    resp.end();
});

export { app };