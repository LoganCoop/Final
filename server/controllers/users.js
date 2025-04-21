import UserModel from '../models/users.js';
import { BadRequestError, NotFoundError } from '../models/errors.js';

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

    static async getUserById(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await UserModel.getUserById(userId);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
        try {
            const { userId } = req.params;
            const updates = req.body;
            const updatedUser = await UserModel.updateUser(userId, updates);
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { userId } = req.params;
            const result = await UserModel.deleteUser(userId);
            res.status(200).json(result);
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
}

export default UserController;