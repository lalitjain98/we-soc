module.exports.home = function(req, res){
    return res.end("<h1>Express Home</h1>")
}

module.exports.about = function(req, res){
    return res.send("<h1>About Section</h1>")
}