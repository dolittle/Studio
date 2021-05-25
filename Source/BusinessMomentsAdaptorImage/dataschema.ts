import mongoose from 'mongoose';

const uri: string = 'mongodb://127.0.0.1:27017/local';

mongoose.connect(uri, (err: any) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('Successfully Connected to MongoDB!');
    }
});

export const DataSchema = new mongoose.Schema({
    tenant: { type: String, required: false },
    publisher: { type: String, required: false },
    operation: { type: String, required: false },
    document: { type: String, required: false },
    timestamp: { type: String, required: false },
    id: { type: String, required: false },
    elements: { type: Array, required: false },
    message: { type: String, required: false },
});

const rawData = mongoose.model('rawData', DataSchema);
export default rawData;
