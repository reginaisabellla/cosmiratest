const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Allows server to handle JSON data

// Connect to MongoDB
mongoose.connect('mongodb+srv://reginaisabellla:cosmira25@cosmira.dktef.mongodb.net/?retryWrites=true&w=majority&appName=cosmira', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define the Product Schema (Database Structure)
const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    brand: String,
    skinType: [String],
    coverage: [String],
    finish: String,
    undertone: [String],
    skinConcerns: [String],
    image: String
}));

// API: Match Quiz Answers to Products
app.post('/api/match-results', async (req, res) => {
    const { skinType, coverage, finish, undertone, skinIssues } = req.body;

    // Find products that match user preferences
    const matchedProducts = await Product.find({
        skinType: skinType,  // Match skin type
        coverage: { $in: coverage },  // Match coverage preferences
        finish: finish,  // Match foundation finish
        undertone: { $in: undertone },  // Match undertone
        skinConcerns: { $in: skinIssues } // Match skin concerns
    }).limit(10);

    res.json({ products: matchedProducts });
});

// Start the server on port 5000
app.listen(5000, () => console.log('connection made'));