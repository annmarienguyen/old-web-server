import express from 'express';
import pagesRouter from './routes/pages.js';
import apiRouter from './routes/api.js';
import { join } from 'path';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

app.use('/', pagesRouter);
app.use('/api', apiRouter);

/* app.get('/', (req, res) => {
  res.send('Hello, web!');
}); */

app.get('/about', (req, res) => {
  res.send('This is a web programming course.');
});

app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.send(`User ${userId}, post ${postId}`);
});

app.get('/search', (req, res) => {
  const term = req.query.term || 'nothing';
  const limit = parseInt(req.query.limit) || 5;
  res.send(`Searching for "${term}", showing ${limit} results.`);
});

app.get('/api/user/:id', (req, res) => {
  const user = { id: req.params.id, name: 'Alice', role: 'admin' };
  res.json(user);
});

app.get('/broken', (req, res) => {
  const user = {name: "Alice"};
  res.send(user.name);
});

// Unit 02 Exercise
app.get('/hello/:name', (req, res) => {
  res.send(`Hello ${req.params.name}`);
});

app.get('/repeat/:word', (req, res) => {
  const {word} = req.params;
  res.send(`${word} ${word} ${word}`);
});

app.get('/count', (req, res) => {
  const start = parseInt(req.query.from) || 1;
  const end = parseInt(req.query.to) || 10;
  res.send(`Counting from ${start} to ${end}.`);
});

app.get('/api/info', (req, res) => {
  const person = { name: "Bob", age: 20};
  res.json(person);
});

app.get('/api/error', (req, res) => {
  res.status(404).send('Bad Request');
});

// Unit 03
app.get('/', (req, res) => {
  res.sendFile(join(import.meta.dirname, 'public', 'index.html'));
});

app.get('/entries', (req, res) => {
  const entries = [
    { title: 'First note' },
    { title: 'Second note' },
    { title: 'Third note' },
  ];
  res.render('entries', { title: 'My Notes', entries });
});

app.get('/entries:id', (req, res) => {
  const entries = [
    { title: 'First note' },
    { title: 'Second note' },
    { title: 'Third note' },
  ];
  const id = parseInt(req.params.id);
  const entry = entries[id];
  if (!entry) {
    res.status(404).render('error', { message: 'Entry not found.' });
    return;
  }
  res.render('entry', { title: entry.title, entry });
});
app.use((req, res) => {
  res.status(404).send('Page not found.');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
