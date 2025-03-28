const express = require('express');
const {handleGetUserReportData, handleDeleteUserReport, handlePostUserReport} = require('../controllers/user-report-controller');
const {handleGetWallpaperReportData, handleDeleteWallpaperReport, handlePostWallpaperReport} = require('../controllers/wallpaper-report-controller');


const Router = express.Router();

Router
    .route('/user')
    .get(handleGetUserReportData)
    .post(handlePostUserReport)
    .delete(handleDeleteUserReport)

Router
    .route('/wallpaper')
    .get(handleGetWallpaperReportData)
    .post(handlePostWallpaperReport)
    .delete(handleDeleteWallpaperReport)

module.exports = Router;