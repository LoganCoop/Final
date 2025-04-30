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
    try {
        const { workout, duration, distance, user_id } = req.body;
        console.log('Received workout POST:', req.body); 
        if (!workout || !duration || !distance || !user_id) {
            return res.status(400).json({ error: 'All fields are required, including user_id (username)' });
        }

        const { data, error } = await supabase.from('u_workouts').insert([{ workout, duration, distance, user_id }]).select('*');
        if (error) {
            console.error('Supabase insert error:', error);
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json(data[0]);
    } catch (err) {
        console.error('Unexpected error in POST /api/workouts:', err);
        res.status(500).json({ error: 'Unexpected server error', details: err.message });
    }
});

// Delete a workout by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('u_workouts').delete().eq('user_id', user_id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ message: 'Workout deleted' });
});

export default router;
