const userModel = require("../models/userModel");

// create new user
exports.createUser = async (req, res) => {
    try {
        const userData = req.body;
        const response = await userModel.createUser(userData);
        res.status(201).json(response);
    } catch (error) {    
        res.status(500).json({ error: error.message });
    }
}
// get all users
exports.getUsers = async (req, res) => {
    try {
        const response = await userModel.getUsers();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// delete user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userModel.deleteUser(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// update user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;
        const response = await userModel.updateUser(id, userData);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

