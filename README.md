# Secure Login Form – OWASP Juice Shop Assignment

## Overview

This project implements a basic secure login form inspired by the OWASP Juice Shop login page. It was developed to demonstrate secure web development practices and the importance of applying validation on both the client and server sides.

The application contains email and password fields, performs client-side validation using JavaScript, and independently validates submitted data on the server using Node.js and Express.

## Features

- Juice Shop-inspired login interface
- Email and password input fields
- Client-side input validation
- Server-side input validation
- Email format validation
- Password length validation
- Input type validation
- Email input normalization
- Safe display of server responses
- JSON-based client-server communication

## Security Measures Implemented

### 1. Client-Side Validation

JavaScript validates user input before sending it to the server.

The form checks:

- Email and password cannot be empty
- Email must follow a valid basic email format
- Password must contain at least 8 characters

Client-side validation provides immediate feedback to users but is not treated as the primary security control because browser-side validation can be bypassed.

### 2. Server-Side Validation

The Express server independently validates all submitted input.

The server checks:

- Required fields are present
- Email and password values are strings
- Email is not empty or whitespace-only
- Email follows the expected format
- Password contains at least 8 characters

This prevents the application from relying only on client-side validation.

### 3. Safe Output Handling

Server responses are displayed using:

    textContent

instead of:

    innerHTML

This ensures response content is treated as text rather than interpreted as executable HTML, reducing the risk of Cross-Site Scripting (XSS).

### 4. Password Field Protection

The password field uses:

    type="password"

which masks the password while it is being entered.

### 5. POST Request

Login information is submitted to the `/login` endpoint using an HTTP POST request with a JSON request body instead of placing credentials in the URL.

## OWASP Security Relevance

The security measures in this project relate to several OWASP Top 10 security principles:

- **A03 – Injection:** Input validation and safe output handling help reduce injection-related risks.
- **A04 – Insecure Design:** Security checks are implemented at both the client and server layers.
- **A07 – Identification and Authentication Failures:** Basic password requirements are enforced by both the client and server.

## Project Structure

    juice-shop-secure-login/
    |
    |-- index.html
    |-- style.css
    |-- script.js
    |-- server.js
    |-- package.json
    |-- README.md

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js

## How to Run

### 1. Clone the repository

    git clone https://github.com/gprath-tamu-7/juice-shop-secure-login.git

### 2. Navigate to the project

    cd juice-shop-secure-login

### 3. Install dependencies

    npm install

### 4. Start the server

    npm start

or:

    node server.js

### 5. Open the application

Navigate to:

    http://localhost:3000

## Example Validation Tests

| Email | Password | Expected Result |
|---|---|---|
| Empty | Empty | Reject – both fields required |
| Empty | `password123` | Reject – email required |
| `test@gmail.com` | Empty | Reject – password required |
| `testgmail.com` | `password123` | Reject – invalid email |
| `test@gmail.com` | `1234567` | Reject – password too short |
| `test@gmail.com` | `password123` | Validation successful |

## Security Testing

The application was tested against basic XSS and SQL Injection payloads.

An XSS payload such as:

    <script>alert('XSS')</script>

was rejected by email validation. Client-side validation was also bypassed by sending the payload directly to `/login`, where server-side validation independently rejected the request.

A basic SQL Injection payload such as:

    ' OR 1=1--

was also rejected by input validation. The current application does not use a SQL database, so there is no SQL query for the payload to manipulate.

## Important Note

This project demonstrates secure form validation for educational purposes. The `/login` endpoint validates submitted credentials but does not authenticate users against a real database.

A production authentication system would require additional controls such as secure password hashing, parameterized database queries, HTTPS, secure session management, rate limiting, authorization controls, and security monitoring.

## Author

**Gagan Kumar**