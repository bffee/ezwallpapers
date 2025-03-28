function handleGetAuthenticationPage(req, res){
    res.render("authentication", {user: req?.user});
};

module.exports = {handleGetAuthenticationPage}