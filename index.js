const express = require('express');
const logger = require('./util/logger');
const app = express();
const path = require('path');
const port = 5000;
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({extended: false}));
app.use('/', require('./routes'))

app.listen(port, (err)=>{
    logger.log( err, `Server Running on port ${port}`);
});