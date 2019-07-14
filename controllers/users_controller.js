module.exports.profile = function (req, res) { 
    return res.render('user_profile', {
        title: "User Profile Page"
    });
}

module.exports.showAll = function(req, res){
    return res.send("<h1>Show All Users</h1>")
}