const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const dbms = require('./db');
const flightRouter = require('./routes/flight_router');

const apiPort = 3000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());
app.use(bodyParser.json());

//dbms.on('error', console.error.bind(console, 'MongoDB Connection error.'));

app.get('/', (req, res ) => {
    //res.send('hello world!');
    res.redirect('/api-docs');
});

app.use('/api', flightRouter);
app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

app.listen(apiPort, () => console.log(`Server is running on port ${apiPort}`));