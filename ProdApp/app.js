const express = require('express');
const cors = require('cors');
const app=express();
const bodyParser=require('body-parser');

const agentsRoutes= require('./api/routes/delev_agents');
const orderRoutes = require('./api/routes/order');
const productsRoutes = require('./api/routes/product');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());

//ROUTING
app.use('/order' , orderRoutes);
app.use('/product' , productsRoutes);
app.use('/agents' , agentsRoutes);

module.exports = app;