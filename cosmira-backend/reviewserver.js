// reviewserver.js
const http = require("http");
const url = require("url");
const { MongoClient, ObjectId } = require("mongodb");

// MongoDB connection settings
const mongoUrl = "mongodb://localhost:27017";
const dbName = "cosmira";

let reviewsCollection;

// Connect to MongoDB
MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to MongoDB");
    const db = client.db(dbName);
    reviewsCollection = db.collection("reviews");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Helper function to send JSON responses
const sendJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
  // Parse request URL and query parameters
  const parsedUrl = url.parse(req.url, true);

  // --- GET /reviews ---
  if (req.method === "GET" && parsedUrl.pathname === "/reviews") {
    const { productId } = parsedUrl.query;
    if (!productId) {
      sendJSON(res, 400, { error: "productId is required" });
      return;
    }
    reviewsCollection
      .find({ productId: new ObjectId(productId) })
      .toArray()
      .then((reviews) => {
        // Calculate average rating
        const averageRating = reviews.length
          ? reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length
          : 0;
        sendJSON(res, 200, { reviews, averageRating });
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        sendJSON(res, 500, { error: "Internal Server Error" });
      });
  }

  // --- POST /reviews ---
  else if (req.method === "POST" && parsedUrl.pathname === "/reviews") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        // Validate required fields
        if (!data.productId || !data.userId || !data.rating) {
          sendJSON(res, 400, {
            error: "productId, userId, and rating are required",
          });
          return;
        }
        const newReview = {
          productId: new ObjectId(data.productId),
          userId: new ObjectId(data.userId),
          rating: data.rating,
          reviewText: data.reviewText || "",
          photoUrl: data.photoUrl || "",
          skinTypes: data.skinTypes || [],
          skinTone: data.skinTone || "",
          createdAt: new Date(),
        };
        reviewsCollection
          .insertOne(newReview)
          .then((result) => {
            sendJSON(res, 201, {
              message: "Review created successfully",
              id: result.insertedId,
            });
          })
          .catch((err) => {
            console.error("Error creating review:", err);
            sendJSON(res, 500, { error: "Internal Server Error" });
          });
      } catch (err) {
        console.error("Error parsing JSON:", err);
        sendJSON(res, 400, { error: "Invalid JSON data" });
      }
    });
  }

  // --- 404 Not Found for any other endpoints ---
  else {
    sendJSON(res, 404, { error: "Not Found" });
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
