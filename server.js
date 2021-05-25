const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const app = express();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(express.static(path.join(__dirname, '/public')));

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/style.css'));
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });
});

app.get('/', (req, res) => {
  res.render('home');
});

  app.get('/about', (req, res) => {
    res.render('about');
  });

  app.get('/info', (req, res) => {
    res.render('info');
  });

  app.get('/history', (req, res) => {
    res.render('history');
  });

  app.get('/contact', (req, res) => {
    res.render('contact');
  });

  app.post('/contact/send-message', (req, res) => {

    const { author, sender, title, message, picture } = req.body;
  
    if(author && sender && title && message && picture) {
      res.render('contact', { isSent: true });
    }
    else {
      res.render('contact', { isError: true });
    }
  
  });

app.get('/user/', (req, res) => {
    res.render('forbidden', {layout: false});
  });

  
app.use((req, res) => {
  res.status(404).send('404 file not found');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});