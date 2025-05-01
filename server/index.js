import express from 'express';
import cors from 'cors';
import { UserController, requireAdmin } from './controllers/users.js';
import authController from './controllers/auth.js';
import workoutsController from './controllers/workouts.js';

const PORT = 3000;
const app = express();


app.use(cors());


app.use(express.json());


app.use(express.static('public'));


app.get('/api/users', requireAdmin, UserController.getAllUsers);
app.get('/api/users/:userId', requireAdmin, UserController.getUserById);
app.put('/api/users/:userId', requireAdmin, UserController.updateUser);
app.delete('/api/users/:userId', requireAdmin, UserController.deleteUser);


app.use('/api/auth', authController);


app.use('/api/workouts', workoutsController);


app.use(express.static('public'));


app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
