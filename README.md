# fullstack_developer_capstone

## Project Overview
This repository contains the full stack microservices architecture for the **fullstack_developer_capstone** project. The application connects a frontend user interface with a Node.js Express dealership management microservice and a Python Flask natural language sentiment analysis service.

## Repository Details
- **Repository Name:** xrwvm-fullstack_developer_capstone
- **Project Name:** fullstack_developer_capstone

## Microservices Architecture
1. **Frontend UI (Port 8000):** Interactive Web portal built with HTML, CSS, and JavaScript.
2. **Dealership Backend Service (Port 3000):** Node.js and Express REST API managing dealership and review records.
3. **Sentiment Analysis Service (Port 5000):** Python Flask REST API utilizing NLTK VADER sentiment analysis for customer reviews.

## Setup & Running Instructions

### 1. Node.js Dealership Microservice
```bash
cd backend-node
npm install
node server.js