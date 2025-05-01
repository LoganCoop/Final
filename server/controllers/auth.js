import express from 'express';
import bcrypt from 'bcryptjs';
import supabase from '../models/supabase.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const { data, error } = await supabase
            .from('users')
            .insert({
                username,
                password_hash: hashedPassword
            })
            .select('id, username, is_admin')
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(201).json({ id: data.id, username: data.username, is_admin: data.is_admin || false });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const { data, error } = await supabase
            .from('users')
            .select('id, username, password_hash, is_admin')
            .eq('username', username)
            .single();

        if (error || !data) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, data.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({ id: data.id, username: data.username, is_admin: data.is_admin });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
