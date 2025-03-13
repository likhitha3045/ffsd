const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    industry: { type: String, required: true },
    location: { type: String, required: true },
    website: { type: String, required: true },
    imageUrl: { type: String, default: '' }  // Added for company logos
});

module.exports = mongoose.model('Company', CompanySchema);
