const express = require('express');
const {verifyToken} = require('../middleware/middleToken');

const { validate } = require('../middleware/validator');
const {userValidations} = require('../validators/sessions');

const routes = express.Router();

//Log in
routes.get(
    '/login',
    require('../controllers/users/login')
);

//Log out
routes.post(
    '/logout',
    verifyToken,
    require('../controllers/users/logout')
);

//Regist new user
routes.post(
    '/register',
    userValidations,
    validate,
    require('../controllers/users/regis')
);

//Delete user
routes.delete(
    '/remove',
    verifyToken,
    require('../controllers/users/remov')
);


module.exports = routes;