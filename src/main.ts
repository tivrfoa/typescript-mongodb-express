import { app } from './app';
import * as http from 'http';
import mongoose from 'mongoose';

const PORT = 8080;

// mongoose needs database name
const MONGO_URI = 'mongodb://localhost:27017/todo';
const server = http.createServer(app);
server.listen(PORT);
server.on('listening', async () => {
    console.info(`Listening on port ${PORT}`);

    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    mongoose.connection.on('open', () => {
        console.info('Connected to Mongo.');
    });
    mongoose.connection.on('error', (err: any) => {
        console.error(err);
    });
});