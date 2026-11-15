const express = require('express');
const path = require('node:path');
const date = require('./date');

function createApp() {
  const app = express();
  const items = ['Buy Food', 'Cook Food', 'Eat Food'];
  const workItems = [];
  app.disable('x-powered-by');
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.urlencoded({ extended: false, limit: '8kb' }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('/', (req, res) => res.render('list', { listTitle: date.getDate(), newListItems: items }));
  app.get('/work', (req, res) => res.render('list', { listTitle: 'Work', newListItems: workItems }));
  app.post('/', (req, res) => {
    const work = req.body.list === 'Work';
    const destination = work ? '/work' : '/';
    if (typeof req.body.newItem !== 'string') return res.status(400).send('A task is required.');
    const newItem = req.body.newItem.trim();
    if (!newItem || newItem.length > 500) return res.status(400).send('Enter a task between 1 and 500 characters.');
    const list = work ? workItems : items;
    if (list.length >= 1000) return res.status(400).send('This demo list is full. Restart to reset it.');
    list.push(newItem);
    return res.redirect(303, destination);
  });
  return app;
}
if (require.main === module) {
  const port = process.env.PORT || 3000;
  createApp().listen(port, process.env.HOST || '127.0.0.1', () => console.log(`To-do demo started on port ${port}`));
}
module.exports = { createApp };
