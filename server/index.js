import express from 'express';
import cors from 'cors';
import { UserController, requireAdmin } from './controllers/users.js';
import authController from './controllers/auth.js';
import workoutsController from './controllers/workouts.js';

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

// Add admin-protected routes for user management
app.get('/api/users', requireAdmin, UserController.getAllUsers);
app.get('/api/users/:userId', requireAdmin, UserController.getUserById);
app.put('/api/users/:userId', requireAdmin, UserController.updateUser);
app.delete('/api/users/:userId', requireAdmin, UserController.deleteUser);

// Register the auth controller
app.use('/api/auth', authController);

// Register the workouts controller
app.use('/api/workouts', workoutsController);

// Add global error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
