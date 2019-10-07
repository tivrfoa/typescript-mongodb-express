import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    description: String,
    mongo: String,
    goes: String,
    obj: Object
});

const TodoModel = mongoose.model('Teste01', TodoSchema);

export default TodoModel;