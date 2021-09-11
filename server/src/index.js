'use strict';

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const config = require('./config');
const passportRoutes = require('./routes/passport-routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

app.use('/api', passportRoutes.routes);


app.listen(8080, () => console.log('Server is starting on url http://localhost:' + '8080'));