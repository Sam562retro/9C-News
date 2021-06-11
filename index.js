const express = require('express');
const app = express();
const compression = require('compression');
const helmet = require('helmet');

app.use(compression({level: 9, threshold: 0}));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
	res.render('home');
})

app.get('/news', (req, res) => {
	res.render('newsMenu');
})

app.get('/news/:type', (req, res) => {
	res.render('showNews');
})

app.get('/main-video', (req, res) => {
	res.render('youtubeVid');
})

app.get('/not-found', (req, res) => {
	res.render('not-found');
})

app.listen(8000);
