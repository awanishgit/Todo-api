var express = require('express');

var app = express();

var PORT = process.env.PORT || 3000;

var todos = [{
	id: 1,
	description: "Meet to mom for lunch Local",
	completed: false
}, {
	id: 2,
	description: "Go to market",
	completed: false
},  {
	id: 3,
	description: "Clean the room",
	completed: false,
}];

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


app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});
