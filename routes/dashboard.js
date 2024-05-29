const express = require('express');

const { validate } = require('../middleware/validator');
const { searchValidations } = require('../validators/searchs');

const {
    verifySearchToken,
    verifySearchLite,
    antiDDoSToken
} = require('./../middleware/middleToken');

const routes = express.Router();

//User dashboar - user / session info
routes.get(
    '/', 
    verifySearchLite,
    require('../controllers/dashb/portal')
)

//Scrap logics - raw data
routes.post(
    '/',
    verifySearchToken,
    antiDDoSToken,
    searchValidations,
    validate,
    require('../controllers/dashb/search'),
)

// Comparsion data
routes.get(
    '/result', 
    require('../controllers/dashb/compare')
)
// Select data
routes.post(
    '/result', 
    require('../controllers/dashb/shop')
)

// Shopping kart
routes.get(
    '/list', 
    require('../controllers/dashb/kart')
)

// Clear shopping kart
routes.delete(
    '/list', 
    require('../controllers/dashb/clear')
)

module.exports = routes;