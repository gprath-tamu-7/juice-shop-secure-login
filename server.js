const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

const PORT = process.env.PORT || 3000;


/*
=========================================
Security Middleware
=========================================
*/


// Security headers
// Helps reduce security misconfiguration risks.
app.use(helmet());


// Limit JSON request body size.
// Prevents unnecessarily large requests.
app.use(express.json({
    limit: "10kb"
}));


// Serve HTML, CSS and JavaScript files
app.use(express.static(__dirname));


/*
=========================================
Login Rate Limiting
=========================================
*/

// Limit repeated login attempts.
// Helps protect against brute-force attempts.
const loginLimiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 5,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        message:
            "Too many login attempts. Please try again later."
    }

});


/*
=========================================
Login Endpoint
=========================================
*/

app.post("/login", loginLimiter, (req, res) => {

    const { email, password } = req.body;


    /*
    -----------------------------------------
    1. Validate data types first
    -----------------------------------------
    */

    if (
        email !== undefined &&
        typeof email !== "string"
    ) {

        return res.status(400).json({
            message: "Server: Invalid input."
        });

    }


    if (
        password !== undefined &&
        typeof password !== "string"
    ) {

        return res.status(400).json({
            message: "Server: Invalid input."
        });

    }


    /*
    -----------------------------------------
    2. Check required fields
    -----------------------------------------
    */

    if (
        (email === undefined || email === "") &&
        (password === undefined || password === "")
    ) {

        return res.status(400).json({
            message:
                "Server: Email and password are required."
        });

    }


    if (
        email === undefined ||
        email.trim() === ""
    ) {

        return res.status(400).json({
            message:
                "Server: Email is required."
        });

    }


    if (
        password === undefined ||
        password.length === 0
    ) {

        return res.status(400).json({
            message:
                "Server: Password is required."
        });

    }


    /*
    -----------------------------------------
    3. Normalize email
    -----------------------------------------
    */

    const cleanEmail = email.trim();


    /*
    -----------------------------------------
    4. Validate email length
    -----------------------------------------
    */

    if (cleanEmail.length > 254) {

        return res.status(400).json({
            message:
                "Server: Invalid email address."
        });

    }


    /*
    -----------------------------------------
    5. Validate email format
    -----------------------------------------
    */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(cleanEmail)) {

        return res.status(400).json({
            message:
                "Server: Invalid email address."
        });

    }


    /*
    -----------------------------------------
    6. Validate password length
    -----------------------------------------
    */

    if (
        password.length < 8 ||
        password.length > 128
    ) {

        return res.status(400).json({
            message:
                "Server: Password must be between 8 and 128 characters."
        });

    }


    /*
    -----------------------------------------
    All validation passed
    -----------------------------------------
    */

    return res.status(200).json({

        message:
            "Login request validated successfully!"

    });

});


/*
=========================================
404 Handler
=========================================
*/

app.use((req, res) => {

    res.status(404).json({
        message: "Resource not found."
    });

});


/*
=========================================
Generic Error Handler
=========================================
*/

// Do not expose stack traces or internal
// implementation details to users.

app.use((err, req, res, next) => {

    console.error(
        "Internal server error:",
        err.message
    );

    res.status(500).json({
        message:
            "An internal server error occurred."
    });

});


/*
=========================================
Start Server
=========================================
*/

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});