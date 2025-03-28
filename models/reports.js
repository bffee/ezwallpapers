const mongoose = require('mongoose');

const wallpaperReportSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    wallpaper: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
        enum: ['inappropriate content', 'copyright violation', 'low quality', 'duplicate', 'other'],
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const userReportSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    for: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
        enum: ['impersonation', 'spam', 'inappropriate profile', 'other'],
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const wallpaperReport = mongoose.model('WallpapersReport', wallpaperReportSchema)
const userReport = mongoose.model('UsersReport', userReportSchema)

module.exports = {userReport, wallpaperReport}