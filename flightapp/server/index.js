const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const db = require('./db');
const flightRouter = require('./routes/flight_router');

const apiPort = 3000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB Connection error.'));

app.get('/', (req, res ) => {
    res.send('hello world!');
});

app.use('/api', flightRouter);

app.listen(apiPort, () => console.log(`Server is running on port ${apiPort}`));