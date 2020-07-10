const express = require('express');

const config = require('./server/config');


//DATABASE
require('./database');

const app = config(express());

// Initiliazations
require('./config/passport');

//STARTING THE SERVER
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
})