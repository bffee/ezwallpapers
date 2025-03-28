const {Wallpapers} = require('../models/wallpapers');

async function handleGetAPI(req, res){

    const limit = 15;
    const query = req.query.cursor ? {_id: {$gt: req.query.cursor}} : {};
    // console.log("query is ",query)

    let wallpapers;
 
    try{
        wallpapers = await Wallpapers.find(query, {source:1, aspect_ratio:1}).limit(limit).sort({_id: 1});
    }
    catch{
        wallpapers = {};
    }

    res.json({wallpapers, cursor: wallpapers[wallpapers.length - 1]._id})

};

module.exports = {handleGetAPI};