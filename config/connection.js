const mongoose = require('mongoose');
const {MONGO_URI} = require('./config');

function connectDatabase(){
    return mongoose.connect(MONGO_URI);
};

module.exports = {connectDatabase};