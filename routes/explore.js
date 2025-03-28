const express = require('express');
const {handleGetExplorePage, handleGetCategoryShowcasePage} = require('../controllers/explore-controller');


const Router = express.Router();

Router
    .route('/')
    .get(handleGetExplorePage)

Router
    .route('/:category')
    .get(handleGetCategoryShowcasePage)

    
module.exports = Router;