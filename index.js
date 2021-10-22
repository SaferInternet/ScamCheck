const express = require('express'),
	app = express(),
	chalk = require('chalk'),
	{ JsonDB } = require('node-json-db'),
	{ Config } = require('node-json-db/dist/lib/JsonDBConfig'),
	bodyParser = require('body-parser'),
	flash = require('connect-flash'),
	session = require('express-session'),
	cookieParser = require('cookie-parser');

let db = new JsonDB(new Config('data', true, true, '.'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(cookieParser('super security $%&/()=!/!"(§/91'));
app.use(
	session({
		cookie: { maxAge: 60000 },
		resave: true,
		saveUninitialized: true,
		secret: 'super security $%&/()=!/!"(§/91'
	})
);
app.use(flash());

app.get('/', (req, res) => {
	let scams = req.flash('scam');
	console.log(scams);
	res.render('home', { scams: scams, error: req.flash('error') });
});

app.get('/data', (req, res) => {
	res.json(require('./data.json'));
});

app.post('/isscam', async (req, res) => {
	let url = req.body.url;

	if (req.body.url.startsWith('http://')) {
		url = url.slice('http://'.length);
	} else if (req.body.url.startsWith('https://')) {
		url = url.slice('https://'.length);
	}

	let scam = await checkForScam(url);

	console.log(scam, url);

	req.flash('scam', scam);
	res.redirect('/');
});

app.get('*', (req, res) => {
	res.redirect('back');
});

app.listen('80', () => {
	console.log(chalk.green('[WEB]: Started!'));
});

checkForScam('discord.com');

function checkForScam(link) {
	let data = require('./data.json').sites;
	if (data.bad.includes(link.toLowerCase())) {
		return 1;
	} else if (data.trusted.includes(link.toLowerCase())) {
		return 3;
	} else {
		return 2;
	}
}
