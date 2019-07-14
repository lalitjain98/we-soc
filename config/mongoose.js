const mongoose = require('mongoose');
const logger = require('../util/logger');
mongoose.connect('mongodb://localhost/we_soc_dev', {useNewUrlParser: true});

const db = mongoose.connection

// db.on('error', logger.err("Error Connecting to DB"));
db.on('error', logger.err.bind(console, 'Error Connecting to DB'))

db.once('open', ()=>logger.success("Connected to Database"))

module.exports = db;