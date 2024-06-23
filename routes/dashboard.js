const express = require('express');

const { validate } = require('../middleware/validator');
const { searchValidations } = require('../validators/searchs');

const {
    verifySearchToken,
    verifySearchLite,
} = require('./../middleware/middleToken');

const routes = express.Router();

//User dashboar - user / session info
routes.post(
    '/', 
    verifySearchLite,
    require('../controllers/dashb/portal')
)

//Scrap logics - raw data
routes.post(
    '/search',
    verifySearchToken,
    searchValidations,
    validate,
    require('../controllers/dashb/search'),
)

// Comparsion data
routes.post(
    '/result', 
    require('../controllers/dashb/compare')
)
// Select data
routes.post(
    '/select', 
    require('../controllers/dashb/shop')
)

// Shopping kart
routes.post(
    '/list', 
    require('../controllers/dashb/kart')
)

// Clear shopping kart
routes.delete(
    '/list', 
    require('../controllers/dashb/clear')
)

module.exports = routes;