'use strict';

var express = require('express');
var app 	= express();
var morgan  = require('morgan');
var request = require('request');
var bodyParser = require('body-parser');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/static'));


app.get('/', function(req, res){
	res.render('form');
});

app.post('/', function(req, res){
var url = 'http://api.wunderground.com/api/9b9842efc9926224/conditions/q/' + req.body.zip + '.json';

//Make a request to Weather Underground API
	request(url, function(error, response, body){
    body = JSON.parse(body);
 	//Get the temp from Weather Underground
    var temp = body.current_observation.temp_f;

    //Color variable to set when we check the temperature
    var color;

    //Check temp and set thermometer
    if(temp < 32){
    	color = 'linear-gradient(blue)';
    }
    else if(temp >= 32 && temp < 70) {
    	color = 'linear-gradient(green, blue)';
    }
    else if(temp >= 70 && temp < 80) {
    	color = 'linear-gradient(yellow, green, blue)';
    }
    else if(temp >= 80 && temp < 90) {
    	color = 'linear-gradient(orange, yellow, green, blue)';
    }
    else {
    	color = 'linear-gradient(red, orange, yellow, green, blue)';
    }


    //Set the offset for the top div
    var offset = 100 - temp;

    res.render('weather', {temp: temp, offset: offset, color: color, zip: req.body.zip});
	});


});


app.listen(process.env.PORT);