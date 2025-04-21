import express from 'express';
import cors from 'cors';
import usersController from './controllers/users.js';
import authController from './controllers/auth.js';

const PORT = 3000;
const app = express();

// Enable CORS
app.use(cors());

// Add middleware to parse JSON requests
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Add routes for user operations
app.post('/api/users', usersController.createUser);
app.put('/api/users/:userId', usersController.updateUser);
app.delete('/api/users/:userId', usersController.deleteUser);
app.get('/api/users', usersController.getAllUsers);

// Register the auth controller
app.use('/api/auth', authController);

// Add global error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
