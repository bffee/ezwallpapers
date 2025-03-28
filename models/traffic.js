const mongoose = require('mongoose');

const trafficSchema = new mongoose.Schema({
    mobile: {
        type: Number,
        default: 0
    },
    pc: {
        type: Number,
        default: 0
    },
    other: {
        type: Number,
        default: 0
    },
    totalVisits: { 
        type: Number, 
        default: 0 
    },
    routes: {
        type: Map,
        of: Number,
        default: {}
    },
    mostVisitedRoute: {
        type: String,
        default: "/"
    },
    date: { 
        type: Date, 
        required: true, 
        unique: true, 
        default: Date.now 
    },  
}, { timestamps: true });

const Traffic = mongoose.model('Traffic', trafficSchema);

module.exports = {Traffic}
