const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://reginaisabellla:cosmira25@cosmira.dktef.mongodb.net/?retryWrites=true&w=majority&appName=cosmira', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Product Schema
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

// Sample products
const products = [
    {
        name: "MBM Surreal Luminous Foundation",
        brand: "Makeup by Mario",
        skinType: ["dry", "normal"],
        coverage: ["medium"],
        finish: "natural",
        undertone: ["neutral", "cool"],
        skinConcerns: ["dryness"],
        image: "foundation1.png"
    },
    {
        name: "Dior Forever Skin Glow",
        brand: "Dior",
        skinType: ["oily", "combination"],
        coverage: ["full"],
        finish: "matte",
        undertone: ["warm"],
        skinConcerns: ["oily skin", "acne"],
        image: "foundation2.png"
    }
];

// Insert sample data
Product.insertMany(products).then(() => {
    console.log("Sample products added!");
    mongoose.connection.close();
});
