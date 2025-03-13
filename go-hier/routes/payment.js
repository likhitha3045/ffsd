const express = require("express");
const router = express.Router();

let payments = []; // In-memory storage

// Process Payment (Store in memory)
router.post("/pay", (req, res) => {
    const { userId, plan, amount, paymentMethod } = req.body;
    const newPayment = { userId, plan, amount, paymentMethod, status: "Completed" };
    
    payments.push(newPayment);
    res.json({ success: true, message: "Payment successful", payment: newPayment });
});

// Get all payments (for debugging)
router.get("/all", (req, res) => {
    res.json(payments);
});

module.exports = router;
