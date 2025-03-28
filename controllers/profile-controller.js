const {Wallpapers} = require('../models/wallpapers');
const {Users} = require('../models/users');

function fetchWallpapers(filter_fields, projection_fields){
    return Wallpapers.find(filter_fields, projection_fields).limit(15).sort({_id: 1});
}

function fetchUser(filter_fields, projection_fields){
    return Users.findOne(filter_fields, projection_fields);
}

async function handleGetProfilePage(req, res){

    // crafting the MongoDB query for wallpapers
    let wallpapers_projection_fields = {source: 1, creator: 1}
    let wallpapers_filter_fields = {creator: req.params.user};
    
    if(req?.query?.cursor){
        wallpapers_filter_fields._id = {$gt: req.query.cursor}
    } 
    
    // crafting the MongoDB query for profile
    let profile_projection_fields = {_id: 0, email: 0, password: 0, privilege: 0 }
    let profile_filter_fields = {username: req.params.user}
    
    // fetching wallpapers
    let wallpapers = await fetchWallpapers(wallpapers_filter_fields, wallpapers_projection_fields);
    let cursor = wallpapers.length >= 15 ? wallpapers[wallpapers.length - 1]._id : null;

    // fetching profile
    let profile = (req?.user?.username) === (req.params.user) ? req.user : await fetchUser(profile_filter_fields, profile_projection_fields);
    
    // sending response
    if(req?.query?.cursor){
        res.json({wallpapers, cursor, profile})
    }
    else{
        console.log(req.user)
        res.render("profile", {wallpapers, cursor, user: req?.user, profile})
    }
    
}; 


module.exports = {handleGetProfilePage};