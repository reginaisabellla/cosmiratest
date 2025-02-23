
// mongodb connection test
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://cosmiradb:cosmira25@cosmira.dktef.mongodb.net/?retryWrites=true&w=majority&appName=cosmira";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
// test end

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Allows server to handle JSON data

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cosmira', {
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
app.listen(5000, () => console.log('Server running on port 5000'));
