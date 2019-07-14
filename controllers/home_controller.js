module.exports.home = function(req, res){
    return res.render('home', {
        title: "Home Page"
    });
}

module.exports.about = function(req, res){
    return res.send("<h1>About Section</h1>")
}