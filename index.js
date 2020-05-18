'use strict'

const express = require('express');
const app = express();
const cors = require('cors');
const morgan =require('morgan');
const dataBase = require('./connect/database');

//importing routes
const routes = require('./routes/api-routes');

//connect database
dataBase();

//settings
app.set('port', process.env.PORT || 8000);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//routes
app.use('/', routes);

//starting the server
app.listen(app.get('port'), () => {
    console.log('servidor por puerto', app.get('port'));
})
