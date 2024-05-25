const express = require('express');
const morgan = require('morgan');
const {dbConnect} = require('./config/mdb-config');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan('dev'));

dbConnect();

app.use('/api', require('./routes'));

app.listen(PORT, ()=>{
    console.log(`Server on http://localhost:${PORT}`);
    console.log(`TEST LOGIN http://localhost:${PORT}/api/users/login`);
})