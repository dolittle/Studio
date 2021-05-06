// Require express and body-parser
var express = require('express');
var bodyParser = require('body-parser');
// Initialize express and define a port
var app = express();
var PORT = 3008;
// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json());
app.post('/api/webhooks-ingestor', function (req, res) {
    if (process.env.WH_AUTHORIZATION) {
        if (req.headers.authorization === process.env.WH_AUTHORIZATION) {
            console.log(req.body); // Call your action on the request here
            res.status(200).end(); // Responding is important
        }
        else {
            res.status(401).end();
        }
    }
});
// Start express on the defined port
app.listen(PORT, function () { return console.log("Server running on port " + PORT); });
