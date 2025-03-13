// server.js

const express = require("express");
const bodyParser = require("express");
const cors = require("cors");
const paymentRoutes = require("./routes/payment");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// In-memory database (instead of MongoDB)
let payments = [];

// Routes
app.use("/api/payment", paymentRoutes);

// Set up EJS for rendering views
app.set("view engine", "ejs");
app.set("views", "./views");

// Home Route
app.get("/", (req, res) => {
    res.render("payment");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
