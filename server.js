const express = require('express');
const cors = require('cors');
const bodyparser = require ('body-parser');
const app = express();
const uuid = require('uuid-v4');
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

var port = process.env.PORT || 8080;

var id=1;

var astronauts=[];


app.post('/addAstronauts', (req,res) => {
  astronauts.push({"id": id, "name" : req.body.firstName, "surname": req.body.lastName, "state": req.body.isInSpace });
  res.json({"id": id, "name" : req.body.firstName, "surname": req.body.lastName, "state": req.body.isInSpace });
  id++;
	res.sendStatus(201);
});

app.get('/userall', (req,res) => {
		res.json(astronauts);
		res.sendStatus(200);
});

app.get('/user/:id', (req,res) => {
	var x = req.params.id;
	var index = astronauts.findIndex(item => {return item.id == x});
	if(index != -1){
		res.json(astronauts[index]);
		res.sendStatus(200);
	}
	else{
		res.sendStatus(404);
	}
});



app.listen(port);
console.log("Listen to port "+port);
