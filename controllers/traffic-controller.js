function handleGetTrafficPage(req, res){
    res.render('traffic', {user: req?.user});
}

module.exports = {handleGetTrafficPage}