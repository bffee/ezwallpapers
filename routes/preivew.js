const express = require('express');
const {handleGetWallpaperPreviewPage} = require('../controllers/preview-controller');

const Router = express.Router();

Router
    .route('/')
    .get(handleGetWallpaperPreviewPage)

module.exports = Router;