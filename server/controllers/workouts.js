import express from 'express';

const router = express.Router();

// In-memory storage for workouts (replace with database in production)
let workouts = [];

// Get all workouts
router.get('/', (req, res) => {
    res.json(workouts);
});

// Add a new workout
router.post('/', (req, res) => {
    const { workout, duration, distance, userToken } = req.body;
    if (!workout || !duration || !distance || !userToken) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const newWorkout = { workout, duration, distance, userToken, id: workouts.length + 1 };
    workouts.push(newWorkout);
    res.status(201).json(newWorkout);
});

// Delete a workout by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    workouts = workouts.filter(workout => workout.id !== parseInt(id));
    res.status(200).json({ message: 'Workout deleted' });
});

export default router;
