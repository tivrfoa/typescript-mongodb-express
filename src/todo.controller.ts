import express from 'express';
import TodoModel from './model/todo';

const todoRouter = express.Router();

todoRouter.get('/todo', async (req, resp) => {    

    try {
        const items = await TodoModel.find();
        resp.json(items);
    } catch(err) {
        resp.status(500);
        resp.end();
        console.error('Caught error', err);
    }
});

todoRouter.post('/todo', async (req, resp) => {
    const description = req.body['description'];
    const item = new TodoModel({
        description
    });
    try {
        const doc = await item.save();
        console.log(`${doc} inserted.`);
    } catch(err) {
        throw err;        
    }; 

    resp.end();
});

todoRouter.put('/todo/:id', async (req, resp) => {
    const description = req.body['description'];
    const id = req.params['id'];
    await TodoModel.findByIdAndUpdate(id, {
            description
        }
    );

    resp.end();
});

todoRouter.delete('/todo/:id', async (req, resp) => {
    console.info('deleting: ', req.params.id);
    const id = req.params['id'];
    const item = await TodoModel.findByIdAndDelete(id);

    resp.end();
});

export default todoRouter;