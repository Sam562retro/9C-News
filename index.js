const express = require('express');
const app = express();
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const details = require('./newsDetails');

app.use(helmet.dnsPrefetchControl({allow : false}));
app.use(helmet.expectCt());
app.use(helmet.frameguard({action : 'deny'}));
app.use(helmet.hidePoweredBy({setTo : 'Django/1.2.1 SVN-13336'}));
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy({policy : 'same-origin'}));
app.use(helmet.xssFilter());

app.use(compression({level: 9, threshold: 0}));
app.set('view engine', 'ejs')

app.use(express.static(path.resolve(__dirname, './media')));

app.get('/', (req, res) => {
	res.render('home');
})

app.get('/news', (req, res) => {
	res.render('newsMenu');
})

app.get('/news/:type', (req, res) => {
	const type = req.params.type;
	if(type === 'international'){
		res.render('showNews', details.internationalNews);
	}else{
		res.redirect('/not-found');
	}
})

app.get('/main-video', (req, res) => {
	res.render('youtubeVid');
})

app.get('/not-found', (req, res) => {
	res.render('not-found');
})

app.get('*', (req, res) => {
  res.status(404).redirect('/not-found');
});

app.listen(8000);
