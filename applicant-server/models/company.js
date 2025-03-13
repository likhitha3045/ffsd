const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    industry: { type: String, required: true },
    location: { type: String, required: true },
    website: { type: String, required: true },
    logo: { type: String, required: true }, // Add logo URL
    description: { type: String, required: true }, // Add company description
});

module.exports = mongoose.model("Company", CompanySchema);
