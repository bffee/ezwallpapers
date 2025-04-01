const express = require('express');

const Router = express.Router();

Router.post('/', (req, res) => {
    res.clearCookie('authToken', { path: '/' }); // Ensure the correct path is used
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = Router;