const express = require('express');
const router = express.Router();

router.get('/signup/:email/:contact', (req, res) => {
    const { email, contact } = req.params;
    res.render('S20230010040_1', { email, contact });
});

router.post('/signup', (req, res) => {
    const { username, password, retypePassword, email, contact } = req.body;

    if (password !== retypePassword) {
        return res.send("Passwords do not match!");
    }

    res.send(`User ${username} signed up successfully!`);
});

module.exports = router;
