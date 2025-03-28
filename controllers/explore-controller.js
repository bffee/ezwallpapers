const {Wallpapers} = require('../models/wallpapers');

function handleGetExplorePage(req, res){
    res.render('explore');
};

async function handleGetCategoryShowcasePage(req, res){

    const page = req.query.page || 0;
    const limit = 5;

    const wallpapers = await Wallpapers.find({category: req.params.category}).skip(limit * page).limit(limit);
    res.render(showcase);
};

module.exports = {handleGetExplorePage, handleGetCategoryShowcasePage};