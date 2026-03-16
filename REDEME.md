# Recipe Sharing Platform

## Overview

This project is a full-stack web application for sharing and discovering recipes.
Users can browse recipes, search based on available ingredients, and view detailed recipe pages.

The platform allows approved users to upload recipes, while administrators manage permissions and content.

A central feature of the system is a smart recipe discovery mechanism that ranks recipes according to the ingredients available to the user.

---

## Technologies

### Client

Angular

### Server

Python
Flask

### Database

SQLite
SQLAlchemy (ORM)

### Additional Libraries

Pillow – image processing
UUID – unique file generation

---

## System Architecture

The application follows a typical **Full-Stack architecture**:

Client (Angular)
Responsible for UI rendering, user interaction and communication with the backend API.

Server (Flask)
Handles business logic, authentication, authorization and recipe processing.

Database (SQLite)
Stores users, recipes and ingredient data using SQLAlchemy ORM.

Image Processing
The server generates additional image variations automatically using Pillow.

---

## Main Features

### Ingredient-Based Recipe Search

Users can enter ingredients they currently have, and the system ranks recipes according to compatibility.

### Recipe Gallery

A dynamic gallery displaying recipes with filtering and sorting options such as:

* preparation time
* recipe type (Dairy / Meat / Parve)
* rating

### Recipe Details Page

Each recipe contains:

* ingredients list
* quantities
* preparation instructions
* image gallery

### Automatic Image Processing

When a recipe image is uploaded, the server automatically generates three additional image variations using the Pillow library.

### Role-Based Access Control

Reader
Can view and search recipes.

Uploader
Can upload recipes after approval.

Admin
Can approve uploaders and delete recipes.

---

## Smart Matching Algorithm

The system calculates a compatibility score between user ingredients and recipe ingredients.

Algorithm steps:

1. Convert ingredient lists into Python sets.
2. Calculate the intersection between sets.
3. Compute the compatibility score:

```python
score = matching_ingredients / total_recipe_ingredients
```

4. Filter low relevance recipes.
5. Sort recipes by score in descending order.

This ensures recipes that require fewer additional ingredients appear first.

---

## Example API Endpoints

GET /recipes
Returns all recipes.

GET /recipes/{id}
Returns a single recipe with full details.

POST /recipes
Upload a new recipe (authorized users only).

POST /auth/login
User authentication.

POST /auth/register
Create a new user account.

---

## Project Structure

```
project-root/
│
├── client/            # Angular application
│   ├── src/
│   ├── components/
│   ├── services/
│   └── environments/
│
├── server/            # Flask backend
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── app.py
│
├── uploads/           # uploaded recipe images
├── database/          # SQLite database
│
├── requirements.txt
├── package.json
└── README.md
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/recipe-platform.git
cd recipe-platform
```

### 2. Install server dependencies

```bash
cd server
pip install -r requirements.txt
```

Run the Flask server:

```bash
python app.py
```

### 3. Install client dependencies

```bash
cd client
npm install
```

Run the Angular development server:

```bash
ng serve
```

The application will run locally and communicate with the Flask API.

---

## Key Concepts Implemented

* Full-Stack development using Angular and Flask
* REST API architecture
* Database management with SQLAlchemy ORM
* Role-based authorization system
* Image processing with Pillow
* Ingredient matching algorithm using Python Sets

---

## Future Improvements

* Add recipe rating and reviews system
* Improve search and filtering capabilities
* Implement authentication with JWT
* Deploy the application to a cloud environment

---

## Author

Developed as a full-stack project demonstrating backend API development, frontend frameworks and database integration.
