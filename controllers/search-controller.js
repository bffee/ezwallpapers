const {Wallpapers} = require('../models/wallpapers');
const {Users} = require('../models/users');

function fetchWallpapers(filter_fields, projection_fields){
    return Wallpapers.find(filter_fields, projection_fields).limit(15).sort({_id: 1});
}

function fetchUsers(filter_fields, projection_fields){
    return Users.findOne(filter_fields, projection_fields);
}

async function handleGetSearchPage(req, res){
    let {search} = req.body
    console.log(typeof search)
    let wallpapers_projection_fields = {source: 1, creator: 1}
    let wallpapers_filter_fields = req?.query?.cursor ? {_id: {$gt: req.query.cursor}, $or: [{title: {$regex: search, $options: 'i'} },{keywords: {$regex: search, $options: 'i'} } ] } : {$or: [{title: {$regex: search, $options: 'i'} },{keywords: {$regex: search, $options: 'i'} } ]};

    let wallpapers = await fetchWallpapers(wallpapers_filter_fields, wallpapers_projection_fields);
    let cursor = wallpapers.length >= 15 ? wallpapers[wallpapers.length - 1]._id : null;

    let creator_references = wallpapers.map((wallpaper) => {
        return wallpaper.creator;
    })

    wallpapers.forEach(wallpaperObj => {
        console.log(wallpaperObj)
        delete wallpaperObj.creator;
    });

    let creator_projection_fields = {_id: 0, fname: 1, lname: 1, username: 1, profilePicture: 1 }
    let creator_filter_fields = {username: {$in: creator_references}}

    let creators = await fetchUsers(creator_filter_fields, creator_projection_fields)

    if(req?.query?.cursor){
        res.json({wallpapers, creators, cursor, user: req?.user})
    }
    else{
        res.render("index", {wallpapers, creators, cursor, user: req?.user});
    }
}; 


module.exports = {handleGetSearchPage};