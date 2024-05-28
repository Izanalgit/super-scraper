const express = require('express');

const { validate } = require('../middleware/validator');
const { searchValidations } = require('../validators/searchs');

const {
    verifySearchToken,
    antiDDoSToken
} = require('./../middleware/middleToken');

const routes = express.Router();

//User dashboar - user / session info
routes.get(
    '/', 
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

module.exports = routes;