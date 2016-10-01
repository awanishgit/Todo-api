var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');


var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;


app.use(bodyParser.json());

app.get('/todos', function (req, res) {
	res.json(todos);
});

app.get('/todos/:id', function (req, res) {

	var todoId = parseInt(req.params.id);

	var mathedTodo = _.findWhere(todos,{id: todoId});

	// var mathedTodo;

	// todos.forEach (function (todo) {
	// 	if (todoId === todo.id) {
	// 		mathedTodo = todo;
	// 	}
	// });


	if (mathedTodo) {
		res.json(mathedTodo);
	} else {
		res.status(404).send();
	}


	//res.send('Asking for todo with id of ' + req.params.id);
});


app.get('/', function (req, res) {

	res.send('Todo API Root');
});

//POST /todos

app.post('/todos',function(req, res) {

var body = _.pick(req.body,'description','completed');

if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
	return res.status(400).send();
}

body.id = todoNextId++;
body.description = body.description.trim();

todos.push(body);

res.json(body);

});

// DELETE /todos/:id

app.delete('/todos/:id', function (req, res) {

	var todoId = parseInt(req.params.id);

	var mathedTodo = _.findWhere(todos,{id: todoId});

	if (mathedTodo) {
		todos = _.without(todos, mathedTodo);
		res.json(mathedTodo);
	} else {
		res.status(404).json({'error':'no todo with that id'});
	}
});

//PUT /todos/:id

app.put('/todos/:id', function (req, res) {

	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	var body = _.pick(req.body,'description','completed');
	var validAttributes = {};

	if (!matchedTodo) {
		return res.status(404).json({'error': 'no todo with that id'});
	}

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	} else if (body.hasOwnProperty('completed')) {
		return res.status(400).send();
	}

	if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	}

	// updating the object

	_.extend(matchedTodo, validAttributes);
	
	res.json(matchedTodo);	


});


app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});
