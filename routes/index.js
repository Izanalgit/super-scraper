const express = require('express');
const session = require('express-session');
const {
    createSession, 
    verifyToken,
    verifyUser
} = require('../middleware/middleToken');

const router = express.Router();

//Open - update session
router.use(session(createSession()));

//Routes
router.use('/users', require('./users'));
router.use('/dashb',verifyToken,verifyUser, require('./dashboard'));


module.exports = router;