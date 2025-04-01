function handleGetAuthenticationPage(req, res){
    if(req.params.form == 'signup'){
        res.render("authentication", {user: req?.user, form: 'signup'});
    }else{
        res.render("authentication", {user: req?.user, form: 'login'});
    }
};

module.exports = {handleGetAuthenticationPage}