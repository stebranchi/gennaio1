const express = require('express');
const cors = require('cors');
const bodyparser = require ('body-parser');
const app = express();
const uuid = require('uuid-v4');
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

var port = process.env.PORT || 8080;



var astronauts=[];


app.post('/addAstronauts', (req,res) => {
  var iUsers= uuid();
  astronauts.push({"id": iUsers, "name" : req.body.firstName, "surname": req.body.lastName, "state": req.body.isInSpace });
	res.json({"id": iUsers, "name" : req.body.firstName, "surname": req.body.lastName, "state": req.body.isInSpace });
	res.sendStatus(201);
});

app.get('/userall', (req,res) => {
		res.json(astronauts);
		res.sendStatus(200);
});



app.listen(port);
console.log("Listen to port "+port);
