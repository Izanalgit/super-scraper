const express = require('express');
const morgan = require('morgan');
const {dbConnect} = require('./config/mdb-config');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

dbConnect();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', require('./routes'));

const server = app.listen(PORT, ()=>{
    console.log(`Server on ${PORT}`);
})

module.exports = {app,server};