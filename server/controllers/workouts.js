import express from 'express';
import supabase from '../models/supabase.js';

const router = express.Router();

// Get all workouts for a user (optionally filter by user_id)
router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('u_workouts').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Add a new workout
router.post('/', async (req, res) => {
    const { workout, duration, distance } = req.body;
    if (!workout || !duration || !distance) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const { data, error } = await supabase.from('u_workouts').insert([{ workout, duration, distance }]).select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
});

// Delete a workout by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('u_workouts').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ message: 'Workout deleted' });
});

export default router;
