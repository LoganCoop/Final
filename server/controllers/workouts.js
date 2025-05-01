import express from 'express';
import supabase from '../models/supabase.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('u_workouts').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

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

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        console.log('Deleting workout with ID:', id); 

        if (!id) {
            return res.status(400).json({ error: 'Workout ID is required.' });
        }

        const { error } = await supabase
            .from('u_workouts')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Supabase delete error:', error);
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ message: 'Workout deleted successfully.' });
    } catch (err) {
        console.error('Unexpected error in DELETE /api/workouts/:id:', err);
        res.status(500).json({ error: 'Unexpected server error', details: err.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { workout, duration, distance } = req.body;

        console.log('Received workout PUT:', req.body); 

        if (!workout || !duration || !distance) {
            return res.status(400).json({ error: 'All fields (workout, duration, distance) are required.' });
        }

        const { data, error } = await supabase
            .from('u_workouts')
            .update({ workout, duration, distance })
            .eq('id', id)
            .select('*');

        if (error) {
            console.error('Supabase update error:', error); 
            return res.status(500).json({ error: error.message });
        }

        if (!data.length) {
            return res.status(404).json({ error: 'Workout not found.' });
        }

        res.status(200).json(data[0]);
    } catch (err) {
        console.error('Unexpected error in PUT /api/workouts/:id:', err); 
        res.status(500).json({ error: 'Unexpected server error', details: err.message });
    }
});

export default router;
