import express from 'express';
import cors from 'cors';
import usersController from './controllers/users.js';

const PORT = 3000;
const app = express();

// Enable CORS
app.use(cors());

// Add middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello!');
});

// Add routes for user operations
app.post('/api/users', usersController.createUser);
app.put('/api/users/:userId', usersController.updateUser);
app.delete('/api/users/:userId', usersController.deleteUser);
app.get('/api/users', usersController.getAllUsers);

// Add global error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
