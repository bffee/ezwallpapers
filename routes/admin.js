const express = require('express');
const {handleGetTrafficPage} = require('../controllers/traffic-controller');
const {handleGetUsersPage} = require('../controllers/users-controller');
const {handleGetWallpapersPage} = require('../controllers/wallpapers-controller');

const Router = express.Router();

Router
    .route('/traffic')
    .get(handleGetTrafficPage)
Router
    .route('/users')
    .get(handleGetUsersPage)
Router
    .route('/wallpapers')
    .get(handleGetWallpapersPage)

module.exports = Router;