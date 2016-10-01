var express = require('express');

var bodyParser = require('body-parser');
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
	var mathedTodo;

	todos.forEach (function (todo) {
		if (todoId === todo.id) {
			mathedTodo = todo;
		}
	});


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

var body = req.body;
// console.log('description: ' + body.description);

// res.json(body);

body.id = todoNextId++;

todos.push(body);

res.json(body);

});


app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});
