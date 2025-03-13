const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const signUpRoute = require('./routes/S20230010040_1');
const signInRoute = require('./routes/S20230010040_2');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(signUpRoute);
app.use(signInRoute);

app.listen(3000, () => {
    console.log("Server running on port 3000");
    console.log("Open in browser: http://localhost:3000/signup/likhitha050@gmail.com/1234567890");
    console.log("Or Sign-in: http://localhost:3000/signin");
});

