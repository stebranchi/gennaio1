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
	res.Status(201);
});

app.get('/userall', (req,res) => {
    var surname = req.query.lastName;
    if(surname == null){
    res.json(astronauts);
    res.Status(200);
    }
    else {
      var index = astronauts.findIndex(item => {return item.surname == surname});
      if (index != -1){

      res.json(astronauts[index]);
      res.Status(200);
      }
      else {
      res.sendStatus(404);
      }
    }
});

app.get('/user/:id', (req,res) => {
	var x = req.params.id;
	var index = astronauts.findIndex(item => {return item.id == x});
	if(index != -1){
		res.json(astronauts[index]);
		res.Status(200);
	}
	else{
		res.sendStatus(404);
	}
});

app.put('/user/:id', (req,res) => {
	var x = req.params.id;
	var index = astronauts.findIndex(item => {return item.id == x});
	if(index != -1){

		astronauts[index] = {"id": x, "name" : req.body.firstName, "surname": req.body.lastName, "state": req.body.isInSpace };
		res.json(astronauts[index]);
		res.Status(203);
	}
	else{
		res.Status(404);
	}
});




app.listen(port);
console.log("Listen to port "+port);
