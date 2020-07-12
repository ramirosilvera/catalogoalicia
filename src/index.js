const express = require('express');

const config = require('./server/config');


// Initiliazations
const app = config(express());
require('./database');
require('./config/passport');


//STARTING THE SERVER
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
})