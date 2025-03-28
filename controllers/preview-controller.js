const {Wallpapers} = require('../models/wallpapers');
const {Users} = require('../models/users');

function fetchWallpapers(filter_fields, projection_fields={}){
    return Wallpapers.find(filter_fields, projection_fields).limit(15).sort({_id: 1});
}

function fetchUsers(filter_fields, projection_fields={}){
    return Users.findOne(filter_fields, projection_fields);
}

async function handleGetWallpaperPreviewPage(req, res){
    let wallpaper = await Wallpapers.findOne({_id: req.query.id});
    let creator = req?.user?._id === wallpaper.creator ? req.user : await Users.findOne({username: wallpaper.creator}, {_id: 0, fname: 1, lname: 1, username: 1, profilePicture: 1});

    let wallpapers_projection_fields = {source: 1, creator: 1}
    let wallpapers_filter_fields = {_id: { $ne: wallpaper._id},keywords: {$in: wallpaper.keywords}};

    if(req?.query?.cursor){
        wallpapers_filter_fields._id = {$gt: {_id: req.query.cursor}}
    }

    let wallpapers = await fetchWallpapers(wallpapers_filter_fields, wallpapers_projection_fields);
    let cursor = wallpapers.length >= 15 ? wallpapers[wallpapers.length - 1]._id : null;
    
    if(wallpapers.length <= 0){
        delete wallpapers_filter_fields.keywords
        wallpapers = await fetchWallpapers(wallpapers_filter_fields, wallpapers_projection_fields);
    }
    
    let creator_references = wallpapers.map((wallpaper) => {
        return wallpaper.creator;
    })

    wallpapers.forEach(wallpaperObj => {
        delete wallpaperObj.creator;
    });

    let creators_projection_fields = {_id: 0, fname: 1, lname: 1, username: 1, profilePicture: 1 }
    let creators_filter_fields = {username: {$in: creator_references}}

    let creators = await fetchUsers(creators_filter_fields, creators_projection_fields)

    if(req?.query?.cursor){
        res.json({wallpaper, wallpapers, creator, creators, cursor, user: req?.user})
    }
    else{
        res.render("preview", {wallpaper, wallpapers, creator, creators, cursor, user: req?.user});
    }

    // if(req.query?.cursor){
    //     wallpapers = await Wallpapers.find({_id: {$gt: req.query.cursor}, creator: req.query.creator}).limit(30).sort({_id: 1});
    // }
    // else{
    //     wallpaper = await Wallpapers.findOne({_id: req.query.id});
    //     wallpapers = await Wallpapers.find({creator: wallpaper.creator}).limit(30).sort({_id: 1});
    // }

    // let wallpaper = await Wallpapers.findOne({_id: req.query.id});
    // let wallpapers = await Wallpapers.find({creator: wallpaper.creator}).limit(30).sort({_id: 1});
    // let creator = await Users.findOne({username: wallpaper.creator}, {_id: 0, fname: 1, lname: 1, username: 1, profilePicture: 1});


    // console.log(wallpaper)

    // res.render("preview", {wallpaper, wallpapers, cursor: wallpapers[wallpapers.length - 1]._id, creator, user: req?.user});
};

module.exports = {handleGetWallpaperPreviewPage}