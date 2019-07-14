const express = require('express');
const logger = require('./util/logger');
const app = express();

const port = 5000;

app.listen(port, (err)=>{
    logger.log( err, `Server Running on port ${port}`);
});