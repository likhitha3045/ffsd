const express = require("express");
const stripe = require("stripe")("your_stripe_secret_key");
const router = express.Router();

// Payment Page
router.get("/", (req, res) => {
    res.render("payment");
});

// Handle Payment
router.post("/charge", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: "Job Portal Subscription" },
                        unit_amount: 5000,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:3000/payment/success",
            cancel_url: "http://localhost:3000/payment/cancel",
        });

        res.redirect(session.url);
    } catch (error) {
        res.status(500).send("Payment failed");
    }
});

module.exports = router;
