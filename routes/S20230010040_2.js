const express = require('express');
const router = express.Router();

const dummyUser = {
    username: "likhitha",
    password: "12345",
    otp: "6789"
};

router.get('/signin', (req, res) => {
    res.render('S20230010040_2');
});

router.post('/signin', (req, res) => {
    const { username, password, otp } = req.body;

    if (username === dummyUser.username && password === dummyUser.password && otp === dummyUser.otp) {
        res.send("Sign-in successful!");
    } else {
        res.send("Invalid credentials!");
    }
});

module.exports = router;
