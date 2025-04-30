import UserModel from '../models/users.js';
import { BadRequestError, NotFoundError, ForbiddenError } from '../models/errors.js';

async function requireAdmin(req, res, next) {
    const userId = req.header('x-user-id');
    if (!userId) return res.status(401).json({ error: 'Missing user id' });
    try {
        const isAdmin = await UserModel.isAdmin(userId);
        if (!isAdmin) return res.status(403).json({ error: 'Forbidden: Admins only' });
        next();
    } catch (err) {
        res.status(403).json({ error: 'Forbidden: Admins only' });
    }
}

class UserController {
    static async createUser(req, res, next) {
        try {
            const userData = req.body;
            const user = await UserModel.createUser(userData);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async getAllUsers(req, res, next) {
        try {
            const users = await UserModel.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    static async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UserModel.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
        try {
            console.log('Received req.params:', req.params); // Debugging log
            console.log('Received req.body:', req.body); // Debugging log

            const { userId } = req.params; // Updated to use userId
            const updates = req.body;

            if (!userId) {
                console.error('Error: User ID is missing in req.params');
                return res.status(400).json({ error: 'User ID is required to update a user.' });
            }

            const updatedUser = await UserModel.updateUser(userId, updates);
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const result = await UserModel.deleteUser(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export { UserController, requireAdmin };