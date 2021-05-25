import mongoose from 'mongoose';
// import ttl from 'mongoose-ttl';
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
    expireAt: { type: Date, index: { expires: '288h' }, default: Date.now },
});
//  DataSchema.index({ lastModifiedDate: 1 }, { expireAfterSeconds: 10 });

// DataSchema.plugin(ttl, { ttl: 5000 });
const rawData = mongoose.model('rawData', DataSchema);
export default rawData;
