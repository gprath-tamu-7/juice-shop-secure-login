# Secure Login Form – OWASP Juice Shop Assignment

## Overview

This project is a basic secure login form inspired by the OWASP Juice Shop login page. It was developed as part of the OWASP Juice Shop / OWASP Top 10 security assignment.

The application demonstrates both client-side and server-side input validation for a login form containing email and password fields. The purpose of the project is to demonstrate why validation should not rely only on the browser and why user input must also be validated by the server.

## Features

- Juice Shop-inspired login interface
- Email and password input fields
- Client-side validation using JavaScript
- Server-side validation using Node.js and Express
- Empty-field validation
- Email format validation
- Minimum password length validation
- JSON-based communication between the frontend and backend
- Safe display of server responses using `textContent`

## Validation Rules

### Client-Side Validation

The browser validates the form before sending a request to the server.

The following checks are performed:

- Email cannot be empty
- Password cannot be empty
- Email must contain `@` and match a basic email format
- Password must contain at least 8 characters

Client-side validation provides immediate feedback to the user and prevents obviously invalid form submissions.

### Server-Side Validation

The `/login` endpoint independently validates the submitted values.

The server checks:

- Email and password are provided
- Email and password are strings
- Email is not empty or whitespace-only
- Email matches the expected format
- Password contains at least 8 characters

Server-side validation is required because client-side JavaScript can be modified, disabled, or bypassed by a user. Therefore, the server does not trust input simply because it passed browser validation.

## Project Structure

    juice-shop-secure-login/
    |
    |-- index.html
    |-- style.css
    |-- script.js
    |-- server.js
    |-- package.json
    |-- README.md

### File Description

- `index.html` – Contains the login form and page structure
- `style.css` – Contains the styling for the Juice Shop-inspired interface
- `script.js` – Performs client-side validation and sends login requests
- `server.js` – Runs the Express server and performs server-side validation
- `package.json` – Defines the project metadata, dependencies, and start command
- `README.md` – Contains project documentation and setup instructions

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js

## Requirements

Before running the project, install:

- Node.js
- npm

You can verify that they are installed by running:

    node --version
    npm --version

## How to Run the Project

### 1. Clone the Repository

    git clone <YOUR-GITHUB-REPOSITORY-URL>

Then navigate into the project directory:

    cd juice-shop-secure-login

### 2. Install Dependencies

Run:

    npm install

This installs Express and the other dependencies listed in `package.json`.

### 3. Start the Server

Run:

    npm start

Alternatively:

    node server.js

The server should display:

    Server running at http://localhost:3000

### 4. Open the Application

Open a web browser and navigate to:

    http://localhost:3000

The login page should now be displayed.

## Example Test Cases

| Email | Password | Expected Result |
|---|---|---|
| Empty | Empty | Email and password cannot be empty |
| Empty | `password123` | Email cannot be empty |
| `user@example.com` | Empty | Password cannot be empty |
| `userexample.com` | `password123` | Invalid email address |
| `user@example.com` | `1234567` | Password must be at least 8 characters |
| `user@example.com` | `password123` | Login request passes validation |

## Request Flow

    User enters credentials
            |
            v
    Client-Side Validation
            |
            v
    POST /login
            |
            v
    Server-Side Validation
            |
            v
    Validation Result
            |
            v
    Response displayed to user

## Security Considerations

This project demonstrates basic secure input-validation practices. Client-side validation improves usability but should never be considered a security boundary because it can be bypassed.

Server-side validation independently checks all submitted values before accepting the request.

For a production authentication system, additional security controls would be required, including:

- Secure password hashing using bcrypt or Argon2
- Parameterized database queries
- HTTPS/TLS
- Rate limiting
- Secure session management
- Authentication and authorization controls
- CSRF protection where applicable
- Security headers
- Logging and monitoring
- Protection against brute-force login attempts

## Important Note

This project is an educational demonstration. The current `/login` endpoint validates the submitted credentials but does not authenticate users against a real user database.

A production login system would securely retrieve the user account, compare the submitted password against a stored password hash, and establish a secure authenticated session.

## Purpose

The purpose of this project is to demonstrate secure development concepts related to user input validation and authentication, particularly the importance of implementing security controls on both the client and server sides.