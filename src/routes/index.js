const express = require('express');
const app = express();

app.use('/api/users', require('./users'));
app.use('/api/regions', require('./regions'));


module.exports = app;