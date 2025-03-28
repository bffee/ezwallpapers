const express = require('express');
const upload = require('../middlewares/wallpaper-upload')
const {handlePostUploadAPI} = require('../controllers/upload-controller');

const Router = express.Router();

Router.post('/', upload.single('wallpaper'), handlePostUploadAPI);

module.exports = Router;