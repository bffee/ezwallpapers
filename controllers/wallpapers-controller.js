function handleGetWallpapersPage(req, res){
    res.render('wallpapers', {user: req?.user});
}

module.exports = {handleGetWallpapersPage}