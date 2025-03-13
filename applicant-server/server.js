const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const stripe = require("stripe")("your_stripe_secret_key"); // Replace with actual key

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Sample company data (Replace with MongoDB later)
let companies = [
    { _id: "1", name: "TechCorp", location: "New York", industry: "IT", description: "A leading tech company." },
    { _id: "2", name: "HealthPlus", location: "Los Angeles", industry: "Healthcare", description: "Healthcare solutions provider." }
];

// ✅ Home Route
app.get("/", (req, res) => {
    res.send("Welcome to GoHire! <br> <a href='/companies'>View Companies</a> | <a href='/payment'>Make a Payment</a>");
});

// ✅ Route: Display Company List
app.get("/companies", (req, res) => {
    res.render("companies", { companies });
});

// ✅ Route: Render the Add Company Form
app.get("/add-company", (req, res) => {
    res.render("add-company");
});

// ✅ Route: Add a Company (POST request)
app.post("/companies/add", (req, res) => {
    const { name, location, industry, description } = req.body;
    if (!name || !location || !industry || !description) {
        return res.send("All fields are required.");
    }
    const newCompany = {
        _id: Date.now().toString(),
        name,
        location,
        industry,
        description
    };
    companies.push(newCompany);
    res.redirect("/companies");
});

// ✅ Route: Delete a Company
app.delete("/company/:id", (req, res) => {
    companies = companies.filter(c => c._id !== req.params.id);
    res.sendStatus(200);
});

// ✅ Route: Payment Page
app.get("/payment", (req, res) => {
    res.render("payment");
});

// ✅ Route: Handle Stripe Payment
app.post("/pay", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: "Premium Membership" },
                        unit_amount: 5000, // $50
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });
        res.redirect(session.url);
    } catch (error) {
        console.error(error);
        res.status(500).send("Payment Error");
    }
});

app.post("/process-payment", express.urlencoded({ extended: true }), (req, res) => {
    console.log("Received form data:", req.body);
    const { paymentMethod, cardholder, cardNumber, expiry, cvv, bank, upi_id } = req.body;

    // Validate Card Payment Fields
    if (paymentMethod === "card") {
        if (!cardholder || !cardNumber || !expiry || !cvv) {
            return res.send("Error: All card details are required.");
        }
        if (!/^\d{16}$/.test(cardNumber)) {
            return res.send("Error: Invalid card number (Must be 16 digits).");
        }
        if (!/^\d{3,4}$/.test(cvv)) {
            return res.send("Error: Invalid CVV (Must be 3-4 digits).");
        }
    }

    // Validate Net Banking
    if (paymentMethod === "netbanking" && !bank) {
        return res.send("Error: Please select a bank.");
    }

    // Validate UPI
    if (paymentMethod === "upi" && !upi_id) {
        return res.send("Error: Please enter a valid UPI ID.");
    }

    // If all validations pass
    res.send("Payment successful!");
});


app.get("/add-company", (req, res) => {
    res.render("add-company");
});



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
