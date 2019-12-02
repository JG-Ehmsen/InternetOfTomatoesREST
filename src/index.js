let express = require('express');
let apiRoutes = require("./api-routes");
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let config = require('../config.json');

let app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api', apiRoutes);

mongoose.connect(config.url + config.db, { useNewUrlParser: true});
var db = mongoose.connection;
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


var port = process.env.PORT || config.port;

app.listen(port, function () {
    console.log("Running API on port " + port);
});
