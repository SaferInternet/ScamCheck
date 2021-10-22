const express = require('express'),
	app = express(),
	chalk = require('chalk'),
	{ JsonDB } = require('node-json-db'),
	{ Config } = require('node-json-db/dist/lib/JsonDBConfig');

let db = new JsonDB(new Config('data', true, true, '.'));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('home');
});

app.listen('80', () => {
	console.log(chalk.green('[WEB]: Started!'));
});
