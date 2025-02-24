const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ Allow requests from your GitHub Pages URL (Update this with your actual username)
app.use(cors({
    origin: ["https://reginaisabellla.github.io", "http://localhost:5500"], // Add localhost for testing
    methods: "GET,POST",
    allowedHeaders: "Content-Type"
}));

app.use(express.json()); // Middleware to parse JSON requests

// ✅ Connect to MongoDB
mongoose.connect('mongodb+srv://reginaisabellla:cosmira25@cosmira.dktef.mongodb.net/cosmira', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// ✅ Define the Product Schema
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

// ✅ Create the `/api/match-results` Route
app.post('/api/match-results', async (req, res) => {
    console.log("Received request at /api/match-results");

    const { skinType, coverage, finish, undertone, skinIssues } = req.body;

    try {
        // ✅ Query the database for matching products
        const matchedProducts = await Product.find({
            skinType: { $in: skinType || [] },  // Match any provided skinType
            coverage: { $in: coverage || [] },  // Match any provided coverage
            finish: finish || { $exists: true },  // If no finish is provided, return all
            undertone: { $in: undertone || [] },  // Match undertones
            skinConcerns: { $in: skinIssues || [] }  // Match skin concerns
        }).limit(10);

        console.log("Matched products:", matchedProducts);
        res.json({ products: matchedProducts });

    } catch (error) {
        console.error("Database query error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
