const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const {
    createSession, 
    verifyToken,
    verifyUser
} = require('../middleware/middleToken');

const router = express.Router();

//Cookie parser
router.use(cookieParser());

//Open - Update session
router.use(session(createSession()));

//Routes
router.use('/users', require('./users'));
router.use('/dashb',verifyToken,verifyUser, require('./dashboard'));


module.exports = router;