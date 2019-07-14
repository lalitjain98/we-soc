module.exports.profile = function (req, res) { 
    return res.send("<h1>User Profile</h1>");
}

module.exports.showAll = function(req, res){
    return res.send("<h1>Show All Users</h1>")
}