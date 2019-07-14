module.exports = {
    info: (msg)=>console.log("INFO", msg),
    warn: (msg)=>console.log("WARNING", msg),
    success: (msg)=>console.log("SUCCESS", msg),
    err: (msg)=>console.log("ERROR", msg),
    log: function(err, successmsg){ err ? this.err(err) : this.success(successmsg) }
};