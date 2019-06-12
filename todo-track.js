
const startupDebugger = require('debug')('app:startup');
const config = require('config');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/config')(app);
require('./startup/db')();
require('./startup/validation')();

const port = process.env.PORT || 8080;
app.listen(port, () => startupDebugger(`Gator listening on port ${port}`));

console.log('Application Name: ' + config.get('name'));

