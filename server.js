// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, ()=>{console.log(`running on localhost:${port}`)})



// Respond with projectData when a GET request is made to the homepage
app.get('/all', (req, res)=> {
    res.send(projectData);
     
  });

//An HTTP POST request sends data to the project's endpoint
app.post('/add',(req,res)=>{
    console.log(req.body)
    
    projectData['date'] = req.body.date;
    projectData['temperature'] = req.body.temperature;
    projectData['feelings'] = req.body.feelings;
    
    res.send(projectData);
    
})