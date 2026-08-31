const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Root endpoint test
app.get('/', (req, res) => {
  res.json({ message: "Dealer Pricing Microservice is active and running!" });
});

// Mock Data for Dealerships
const dealers = [
  {
    id: 1,
    name: "Best Cars NYC",
    city: "New York",
    state: "NY",
    address: "123 Main St",
    zip: "10001"
  },
  {
    id: 2,
    name: "Austin Auto Hub",
    city: "Austin",
    state: "TX",
    address: "456 Oak Rd",
    zip: "73301"
  },
  {
    id: 3,
    name: "Chicago Motor Group",
    city: "Chicago",
    state: "IL",
    address: "789 Lakefront Dr",
    zip: "60601"
  }
];

// Mock Data for Reviews
let reviews = [
  {
    id: 1,
    dealerId: 1,
    name: "Alice Smith",
    review: "Great customer service and fast delivery! Very happy with my purchase.",
    car_make: "Toyota",
    car_model: "Camry",
    car_year: 2022
  },
  {
    id: 2,
    dealerId: 1,
    name: "Bob Jones",
    review: "The buying process was terrible, slow, and full of unexpected fees.",
    car_make: "Honda",
    car_model: "Civic",
    car_year: 2021
  },
  {
    id: 3,
    dealerId: 2,
    name: "Charlie Brown",
    review: "Average experience. Nothing extraordinary, but got the job done.",
    car_make: "Ford",
    car_model: "Mustang",
    car_year: 2023
  }
];

// Endpoint: Fetch all dealerships
app.get('/fetchDealers', (req, res) => {
  res.json(dealers);
});

// Endpoint: Fetch single dealership by ID
app.get('/fetchDealer/:id', (req, res) => {
  const dealer = dealers.find(d => d.id === parseInt(req.params.id));
  if (dealer) {
    res.json(dealer);
  } else {
    res.status(404).json({ error: "Dealer not found" });
  }
});

// Endpoint: Fetch reviews for a specific dealership
app.get('/fetchReviews/dealer/:id', (req, res) => {
  const dealerReviews = reviews.filter(r => r.dealerId === parseInt(req.params.id));
  res.json(dealerReviews);
});

// Endpoint: Add a new review
app.post('/insertReview', (req, res) => {
  const newReview = {
    id: reviews.length + 1,
    ...req.body
  };
  reviews.push(newReview);
  res.status(201).json({ status: "Review added successfully", review: newReview });
});

app.listen(PORT, () => {
  console.log(`Node Dealership Microservice is running on http://localhost:${PORT}`);
});