const express = require('express');
const {verifyToken} = require('../middleware/middleToken');

const { validate } = require('../middleware/validator');
const {userValidations} = require('../validators/sessions');

const routes = express.Router();

//Login manual-TESTEO
routes.get('/login',(req,res)=>{
    res.send(`
        <form action="/api/users/login" method="post">
        <label for="name">Nombre :</label>
        <input type="text" id="name" name="name" required><br>
        <label for="pswd">Contraseña :</label>
        <input type="password" id="pswd" name="pswd" required><br>

        <button type="submit">Log In</button>
        </form>
    `)
})

routes.post(
    '/login',
    require('../controllers/users/login')
);
routes.post(
    '/logout',
    verifyToken,
    require('../controllers/users/logout')
);
routes.post(
    '/register',
    userValidations,
    validate,
    require('../controllers/users/regis')
);
routes.delete(
    '/remove',
    verifyToken,
    require('../controllers/users/remov')
);


module.exports = routes;