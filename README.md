# Contract Management Platform (Backend)

# contract-management-backend

A simple contract management system built using the MERN stack that allows users to create reusable contract blueprints, generate contracts from them, and manage contract lifecycle with role-based actions (Approver vs Signer).

For frontend refer to - https://github.com/Mohit8820/contract-management-frontend/blob/main/README.md

# Setup Instructions

## Prerequisites

install these globally
Node.js (v18+ recommended)
MongoDB (local or Atlas)
npm

## Setup

download this repository as zip and extract it or clone it from the given link -https://github.com/Mohit8820/contract-management-backend.git
open this folder - "contract-management-backend" (in terminal : cd contract-management-backend)
Run below commands-
npm install

## Environment Variables

Create a "nodemon.json" file inside contract-management-backend/:

and add your environment variables in this file as-
{
"env": {
"MONGO_URI": "mongodb://127.0.0.1:27017/contracts-db"
}
}

or for atlas
{
"env": {
"MONGO_URI": "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/contracts-db"
}
}

## Run Backend

npm run dev

Backend will start at:

http://localhost:4000

# Backend Architecture (Node.js + Express + MongoDB) RESTful design

## High-Level Structure

src/
├── controllers/ → Request handling & business logic
├── models/ → MongoDB schemas (Mongoose)
├── routes/ → API route definitions
├── app.ts → Express app configuration

## Controllers Layer (src/controllers/)

Purpose:
Handle incoming HTTP requests, apply business rules, and return responses.

controllers/
├── blueprint-controller.ts
└── contract-controller.ts

Responsibilities
Controller Responsibility
blueprint-controller CRUD operations for blueprints
contract-controller Contract creation, updates, lifecycle

## Models Layer (src/models/)

Purpose:
Define MongoDB schemas and data structure using Mongoose.

models/
├── Blueprint.ts
└── Contract.ts

Responsibilities
Model Description
Blueprint Reusable contract templates
Contract Contract instance with lifecycle

## Routes Layer (src/routes/)

Purpose:
Map HTTP endpoints to controller functions.

routes/
├── blueprint-routes.ts
└── contract-routes.ts

Example
router.post("/from-blueprint", createContractFromBlueprint);

## App Initialization (src/app.ts)

Purpose:
Configure and start the Express application.

Responsibilities

Express setup

Middleware registration

MongoDB connection

Route mounting

app.use("/api/blueprints", blueprintRoutes);
app.use("/api/contracts", contractRoutes);

# API Design Summary

## Blueprint APIs

GET - /api/blueprints List - all blueprints
POST - /api/blueprints - Create blueprint
PATCH - /api/blueprints/:id - Update blueprint
DELETE - /api/blueprints/:id - Delete blueprint

## Contract APIs

GET - /api/contracts - List contracts
GET - /api/contracts/:id - Get contract details
POST - /api/contracts/from-blueprint - Create contract
PATCH - /api/contracts/:id/status - Update status
PATCH - /api/contracts/:id/fields - Update fields

# Trade-offs

No auth Faster implementation, simpler UX
UI-only roles Meets requirement without backend complexity
