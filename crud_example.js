
const express = require('express');
const app = express();
app.use(express.json()); // for parsing application/json

// In-memory data store for simplicity
let posts = [
  { id: 1, title: 'First post', content: 'This is the first post.' },
  { id: 2, title: 'Second post', content: 'This is the second post.' }
];
let nextId = 3;

// C (Create) - Create a new post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send({ message: 'Title and content are required.' });
  }
  const newPost = { id: nextId++, title, content };
  posts.push(newPost);
  res.status(201).send(newPost);
});

// R (Read) - Get all posts
app.get('/posts', (req, res) => {
  res.send(posts);
});

// R (Read) - Get a single post by id
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).send({ message: 'Post not found.' });
  }
  res.send(post);
});

// U (Update) - Update a post
app.put('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).send({ message: 'Post not found.' });
  }

  const { title, content } = req.body;
  if (title) {
    post.title = title;
  }
  if (content) {
    post.content = content;
  }

  res.send(post);
});

// D (Delete) - Delete a post
app.delete('/posts/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex === -1) {
    return res.status(404).send({ message: 'Post not found.' });
  }

  posts.splice(postIndex, 1);
  res.status(204).send();
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
