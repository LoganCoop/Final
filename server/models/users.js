import supabase from './supabase.js';
import { BadRequestError, NotFoundError, ForbiddenError } from './errors.js';

class UserModel {
    static async createUser(userData) {
        const { email, password, ...rest } = userData;

        if (!email || !password) {
            throw new BadRequestError('Email and password are required.');
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            throw new BadRequestError(error.message);
        }

        const { user } = data;

        const { error: profileError } = await supabase
            .from('profiles')
            .insert({ id: user.id, ...rest });

        if (profileError) {
            throw new BadRequestError(profileError.message);
        }

        return user;
    }

    static async getAllUsers() {
        const { data, error } = await supabase
            .from('users')
            .select('id, username, is_admin');
        if (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
        return data;
    }

    static async getUserById(userId) {
        const { data, error } = await supabase
            .from('users')
            .select('id, username, is_admin')
            .eq('id', userId)
            .single();
        if (error || !data) {
            throw new NotFoundError('User not found.');
        }
        return data;
    }

    static async updateUser(userId, updates) {
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', userId)
            .select('id, username, is_admin');
        if (error || !data.length) {
            throw new NotFoundError('Failed to update user or user not found.');
        }
        return data[0];
    }

    static async deleteUser(userId) {
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', userId);
        if (error) {
            throw new NotFoundError('Failed to delete user or user not found.');
        }
        return { message: 'User deleted successfully.' };
    }

    static async isAdmin(userId) {
        const { data, error } = await supabase
            .from('users')
            .select('is_admin')
            .eq('id', userId)
            .single();
        if (error || !data) {
            throw new ForbiddenError('User not found or not authorized.');
        }
        return !!data.is_admin;
    }
}

export default UserModel;