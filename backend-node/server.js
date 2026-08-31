const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS so the frontend application can fetch dealer prices
app.use(cors());
app.use(express.json());

// Sample dealer pricing dataset
const DEALER_PRICES = [
    { id: 101, dealerName: "Apex Auto Supplies", productId: 1, price: 450.00 },
    { id: 102, dealerName: "Metro Car Parts", productId: 1, price: 425.50 },
    { id: 103, dealerName: "Apex Auto Supplies", productId: 2, price: 120.00 },
    { id: 104, dealerName: "Precision Brake Co.", productId: 2, price: 115.75 },
    { id: 105, dealerName: "Metro Car Parts", productId: 3, price: 28.99 },
    { id: 106, dealerName: "Lube & Oil Direct", productId: 3, price: 24.50 },
    { id: 107, dealerName: "Apex Auto Supplies", productId: 4, price: 85.00 },
    { id: 108, dealerName: "Tire World Express", productId: 4, price: 79.99 }
];

// Root endpoint to prevent "Cannot GET /" message
app.get('/', (req, res) => {
    res.json({ message: "Dealer Pricing Microservice is active and running!" });
});

// GET endpoint to return dealer pricing (supports filtering by productId)
app.get('/dealer-pricing', (req, res) => {
    const productId = parseInt(req.query.productId);
    if (!isNaN(productId)) {
        const filteredDealers = DEALER_PRICES.filter(d => d.productId === productId);
        return res.json({ status: "success", dealers: filteredDealers });
    }
    return res.json({ status: "success", dealers: DEALER_PRICES });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dealer Pricing Microservice running on port ${PORT}`);
});