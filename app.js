const express = require('express');
const cors = require('cors');
// const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const {dbConnect} = require('./config/mdb-config');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

dbConnect();

app.use(cors());
// app.use(helmet());

app.use(compression());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(morgan('dev'));

app.use('/api', require('./routes'));

app.get('/health',(req,res)=>res.status(200).json({message:'server on'}));

const server = app.listen(PORT, ()=>{
    console.log(`Server on ${PORT}`);
})
