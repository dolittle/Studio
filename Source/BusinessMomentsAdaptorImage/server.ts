import express from 'express';
import bodyParser from 'body-parser';
import process from 'process';

// Initialize express and define a port
const app = express();
const PORT = 3008;

// Tell express to use body-parser's JSON parsing

app.use(bodyParser.json());

app.post('/api/webhooks-ingestor', (req: any, res: any) => {
    if (req.headers.authorization === process.env.WH_AUTHORIZATION) {
        console.log(req.body); // Call your action on the request here
        res.status(200).end(); // Responding is important
    } else {
        res.status(401).end();
    }
});

// Start express on the defined port
if (process.env.WH_AUTHORIZATION) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} else {
    console.log('WH_AUTHORIZATION is not set.');
    process.exit(1);
}
