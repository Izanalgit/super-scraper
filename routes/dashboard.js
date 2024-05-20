const express = require('express');

const { validate } = require('../middleware/validator');
const { searchValidations } = require('../validators/searchs');

const routes = express.Router();

routes.get(
    '/', 
    require('../controllers/dashb/portal')
)
routes.post(
    '/',
    searchValidations,
    validate,
    require('../controllers/dashb/search')
)
// routes.get(
//     '/result', 
//     require('../controllers/dashb/compare')
// )

module.exports = routes;