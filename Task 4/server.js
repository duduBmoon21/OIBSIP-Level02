const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // secure: true for HTTPS
}));

// Dummy database (in-memory)
const users = [];

// Helper function to check if user exists by username
function findUser(username) {
    return users.find(user => user.username === username);
}

// Routes

// Home Route - Registration/Login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Register Route - Handles registration
app.post('/register', (req, res) => {
    const { fullname, username, email, phone, password, confirm_password, gender } = req.body;

    // Check if passwords match
    if (password !== confirm_password) {
        return res.send(`
            <html>
                <head>
                    <style>
                        .alert-box {
                            padding: 20px;
                            background-color: red;
                            color: white;
                            font-family: Arial, sans-serif;
                            position: fixed;
                            top: 20px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 300px;
                            text-align: center;
                            border-radius: 5px;
                            display: none;
                        }
                    </style>
                    <script>
                        function showAlert(message, color) {
                            const alertBox = document.getElementById('alertBox');
                            alertBox.style.display = 'block';
                            alertBox.innerText = message;
                            alertBox.style.backgroundColor = color;
                            
                            // Hide after 3 seconds and redirect to home
                            setTimeout(() => {
                                window.location.href = '/';
                            }, 3000);
                        }

                        // Show error alert
                        window.onload = function() {
                            showAlert('Passwords do not match.', 'red');
                        };
                    </script>
                </head>
                <body>
                    <div id="alertBox" class="alert-box"></div>
                </body>
            </html>
        `);
    }

    // Check if user already exists
    if (findUser(username)) {
        return res.send(`
            <html>
                <head>
                    <style>
                        .alert-box {
                            padding: 20px;
                            background-color: red;
                            color: white;
                            font-family: Arial, sans-serif;
                            position: fixed;
                            top: 20px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 300px;
                            text-align: center;
                            border-radius: 5px;
                            display: none;
                        }
                    </style>
                    <script>
                        function showAlert(message, color) {
                            const alertBox = document.getElementById('alertBox');
                            alertBox.style.display = 'block';
                            alertBox.innerText = message;
                            alertBox.style.backgroundColor = color;
                            
                            // Hide after 3 seconds and redirect to home
                            setTimeout(() => {
                                window.location.href = '/';
                            }, 3000);
                        }

                        // Show error alert
                        window.onload = function() {
                            showAlert('User already exists.', 'red');
                        };
                    </script>
                </head>
                <body>
                    <div id="alertBox" class="alert-box"></div>
                </body>
            </html>
        `);
    }

    // Register the new user
    const newUser = { fullname, username, email, phone, password, gender };
    users.push(newUser);

    // Send HTML response with success alert
    res.send(`
        <html>
            <head>
                <style>
                    .alert-box {
                        padding: 20px;
                        background-color: green;
                        color: white;
                        font-family: Arial, sans-serif;
                        position: fixed;
                        top: 20px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 300px;
                        text-align: center;
                        border-radius: 5px;
                        display: none;
                    }
                </style>
                <script>
                    function showAlert(message, color) {
                        const alertBox = document.getElementById('alertBox');
                        alertBox.style.display = 'block';
                        alertBox.innerText = message;
                        alertBox.style.backgroundColor = color;
                        
                        // Hide after 3 seconds and redirect to login page
                        setTimeout(() => {
                            window.location.href = './signIn.html';
                        }, 3000);
                    }

                    // Show success alert
                    window.onload = function() {
                        showAlert('Registration successful! Please login.', 'green');
                    };
                </script>
            </head>
            <body>
                <div id="alertBox" class="alert-box"></div>
            </body>
        </html>
    `);
});


// Login Route - Handles login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = findUser(username);

    // Check if user exists and password matches
    if (!user || user.password !== password) {
        return res.send('Invalid credentials');
    }

    // Save the session and redirect to the secured page
    req.session.user = user;
    res.redirect('/dashboard');
});

// Secured dashboard page (only for logged-in users)
app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
