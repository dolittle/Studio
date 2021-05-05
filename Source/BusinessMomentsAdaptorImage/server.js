// Require express and body-parser
const express = require("express")
const bodyParser = require("body-parser")
//global.atob = require("atob");

// Initialize express and define a port
const app = express()
const PORT = 3008

// Tell express to use body-parser's JSON parsing
//app.use(bodyParser.json())

app.use(bodyParser.json());

app.post("/api/webhooks-ingestor", (req, res) => {
    console.log(req.headers.authorization);
    if (req.headers.authorization.split(" ")[1]===process.env.WH_TOKEN){
        console.log(req.body) // Call your action on the request here
        res.status(200).end() // Responding is important
    }
    else{
        res.status(401).end();
    }

  })

// Start express on the defined port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
