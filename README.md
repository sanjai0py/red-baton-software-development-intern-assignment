# HackerNews Scraper and Dashboard

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Scraper](#scraper)
   - [Scraped Data](#scraped-data)
4. [Dashboard](#dashboard)
   - [Run Dashboard](#run-dashboard)
   - [Dashboard Features](#dashboard-features)
5. [Database](#database)
   - [Data Structure](#data-structure)
   - [User Model](#user-model)
     - [Fields](#fields)
   - [Article Model](#article-model)
     - [Fields](#fields-2)
   - [UserArticle Model](#userarticles-model)
     - [Fields](#fields)
6. [Error Codes](#errors)

## Introduction

This project combines a web scraper built with Node.js and a simple dashboard to interact with the scraped HackerNews data. The scraper fetches news items, and the dashboard provides a user interface to view, mark as read, and delete articles.

## Getting Started

```bash
# Clone the repository
git clone https://github.com/sanjai0py/red-baton-software-development-intern-assignment.git

# Populate .env variables
cp .env.example .env

# Navigate to the project directory
cd red-baton-software-development-intern-assignment

# Install dependencies
npm install
```

## Scraper

Once you got into the folder the scraper is located `/server/scraper/`.

### Scraped Data

The scraped data includes information such as title, URL, posted time, upvotes. The data is stored in the `PostgreSQL` database for further use.

## Dashboard

### Run Dashboard

To start the dashboard and interact with the scraped data, cd into client folder and enter the following command

```bash
npm start
```

This will launch a local server, and you can access the dashboard in your browser at [http://localhost:3000](http://localhost:3000).

### Dashboard Features

- **View News Items:** Browse the latest news items in reverse chronological order.
- **Mark as Read:** Mark articles as read to keep track of what you've already viewed.
- **Delete Articles:** Hide articles from your dashboard without removing them from the database.

## Database

### Data Structure

The database stores two main entities: Users and Articles. Additionally, the UserArticles table manages the many-to-many relationship between users and articles, tracking read and deleted actions.

### User Model

The `User` model represents a HackerNews user.

#### Fields

- `id`: User ID (integer).
- `username`: User's username.
- `email`: User's email address.

### Article Model

The `Article` model represents a news article on HackerNews.

#### Fields


- `id`: Article ID (integer).
- `title`: Article title.
- `url`: Article URL.
- `postedOn`: Date and time when the article was posted.
- `upvotes`: The number of upvotes the article got.
- `link`: The original link of the article
- `hnurl`: The Hackernews url for the article

### UserArticles Model

The `UserArticles` model manages the many-to-many relationship between users and articles, tracking read and deleted actions.

#### Fields

- `userId`: Foreign key linking to the `User` model.
- `articleId`: Foreign key linking to the `Article` model.
- `markAsRead`: Boolean indicating if the user marked the article as read.
- `markedAsDeleted`: Boolean indicating if the user marked the article as deleted.

## Errors

The API may return the following error codes:

- `400 Bad Request`: Invalid request parameters.
- `401 Unauthorized`: Missing or invalid API key.
- `403 Forbidden`: Insufficient permissions.
- `404 Not Found`: Resource not found.
- `429 Too Many Requests`: Rate limiting exceeded.
- `500 Internal Server Error`: Server-side error.
