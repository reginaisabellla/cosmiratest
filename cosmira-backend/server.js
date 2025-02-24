const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ Allow CORS requests from your GitHub Pages site
app.use(cors({
    origin: ["https://yourusername.github.io", "http://localhost:5500"],
    methods: "GET,POST",
    allowedHeaders: "Content-Type"
}));

app.use(express.json()); // Middleware to parse JSON requests

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
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
        const matchedProducts = await Product.find({
            skinType: { $in: skinType || [] },
            coverage: { $in: coverage || [] },
            finish: finish || { $exists: true },
            undertone: { $in: undertone || [] },
            skinConcerns: { $in: skinIssues || [] }
        }).limit(10);

        console.log("Matched products:", matchedProducts);
        res.json({ products: matchedProducts });

    } catch (error) {
        console.error("Database query error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Set Correct Port for Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
