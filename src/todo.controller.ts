import express from 'express';
import mongodb from 'mongodb';
import { MongoHelper } from './mongo.helper';

const todoRouter = express.Router();

const getCollection = () => {
    return MongoHelper.client.db('todo').collection('teste01');
}

todoRouter.get('/todo', (req, resp) => {    

    const collection = getCollection();
    collection.find({}).toArray((err, items) => {
        if (err) {
            resp.status(500);
            resp.end();
            console.error('Caught error', err);
        } else {
            resp.json(items);
        }
    });
});

/**
 * When testing on browser, remove Content-Length
 *   so it creates automatically.
 * Content-Type: application/json
 * {"description": "db.teste01.find()"}
 * {"mongo":"anything","goes":"ok?"}
 */
todoRouter.post('/todo', (req, resp) => {
    console.log(req.body);
    let obj: any = {};
    for (let key in req.body) {
        const value = req.body[key];
        console.log(key + " => " + value);
        obj[key] = value;
    }
    const collection = getCollection();
    collection.insertOne(obj, (err, res) => {
        if (err) throw err;
        console.log("1 documented inserted");
    }); 

    resp.end();
});

todoRouter.put('/todo/:id', (req, resp) => {
    const description = req.body['description'];
    console.log('description', description);
    const collection = getCollection();
    const id = req.params['id'];

    collection.findOneAndUpdate(
        {
            "_id": new mongodb.ObjectId(id)
        },
        {
            $set: {description: description}
        }
    );

    resp.end();
});

todoRouter.delete('/todo/:id', (req, resp) => {
    console.info('deleting: ', req.params.id);
    const collection = getCollection();
    const id = req.params['id'];

    collection.deleteOne({
        "_id": new mongodb.ObjectId(id)
    });

    resp.end();
});

export default todoRouter;