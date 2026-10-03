const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    // 1. Check for empty fields
    if (email === "" && password === "") {
        message.textContent =
            "Email and password cannot be empty.";
        return;
    }

    if (email === "") {
        message.textContent =
            "Email cannot be empty.";
        return;
    }

    if (password === "") {
        message.textContent =
            "Password cannot be empty.";
        return;
    }


    // 2. Validate maximum email length
    if (email.length > 254) {
        message.textContent =
            "Please enter a valid email address.";
        return;
    }


    // 3. Validate email format
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        message.textContent =
            "Please enter a valid email address.";
        return;
    }


    // 4. Validate password length
    if (password.length < 8) {
        message.textContent =
            "Password must be at least 8 characters.";
        return;
    }

    if (password.length > 128) {
        message.textContent =
            "Password cannot exceed 128 characters.";
        return;
    }


    // 5. Send validated request to server
    try {

        const response = await fetch("/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })

        });


        const data = await response.json();


        // Use textContent instead of innerHTML.
        // This prevents the response from being interpreted
        // as executable HTML.
        message.textContent = data.message;


    } catch (error) {

        message.textContent =
            "Unable to connect to server.";

    }

});