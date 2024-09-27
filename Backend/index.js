const express = require("express"); // requiring express package
const db = require("./routes/database"); // requiring database which is in database.js file
const path = require("path"); // requiring path for static files (static files are resources like images, CSS, and JS that don't change)
const session = require('express-session'); // requiring session to store info across various pages; a session is created on login
const app = express();    
const bodyParser = require('body-parser');                           
const port = 3001;
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173', // React app's address
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], 
    credentials: true // 
}));

// Middleware
app.use(express.static(path.join(__dirname, "public"))); // Serving static files from "public" directory
app.set("view engine", "ejs"); // Setting view engine to EJS for rendering HTML templates
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded form data
app.use(express.json()); // For parsing JSON data if needed

// **Setup express-session middleware**
app.use(session({
    secret: 'nan@&1234', // Replace with a strong secret key
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create a session until something is stored
    cookie: { 
        secure: false, // Set to true if using HTTPS
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
        
    }
}));



// Routes
app.get('/', (req, res) => {
    res.render('index'); // Rendering the index.ejs file which is our home page
});

// Register route
app.get('/register', (req, res) => {
    res.render('register'); // Rendering the registration page
});

// Login route
app.get('/login', (req, res) => {
    res.render('login'); // Rendering the login page                       
});

// Adding new user
app.post('/register', (req, res) => {
    const { userID, userName, userEmail, userPassword, userPhoneNumber, userAddress } = req.body;

    if (!userID || !userName || !userEmail || !userPassword || !userPhoneNumber || userAddress) {
        return res.send('All fields are required!');
    }

    // Insert the new user into the database
    db.query('INSERT INTO user (userID, userName, userEmail, userPassword, userPhoneNumber, userAddress) VALUES (?, ?, ?, ?, ?, ?)', 
    [userID, userName, userEmail, userPassword, userPhoneNumber, userAddress], (err, result) => {
        if (err) throw err;
        res.redirect('/login'); // After successfully adding the entries, redirecting to login page
    });
});


// Handling user login

app.post('/login', (req, res) => {
    const { userEmail, userPassword } = req.body;

    console.log('Request Body:', req.body); // Debugging log
    console.log('Email entered:', userEmail);  // Log email entered
    console.log('Password entered:', userPassword);  // Log password entered

    db.query('SELECT * FROM user WHERE userEmail = ? AND userPassword = ?', [userEmail, userPassword], (err, results) => {
        if (err) {
            console.error('Database error:', err); // Log database error
            return res.send('An error occurred, please try again.');
        }

        console.log('Database results:', results);  // Log the results from the database

        if (results.length > 0) {
            // Corrected: Match the field name with database key 'userID'
            req.session.userID = results[0].userID;  // If login successful, create a session
            req.session.userName = results[0].userName;
            console.log('Session after login:', req.session); // Log session details
            res.redirect('/dashboard'); // Successfully redirecting to dashboard
        } else{
            res.send("Incorrect password and email");
        }
    });
});


// Dashboard route
app.get('/dashboard', (req, res) => {
    console.log('Session on dashboard:', req.session); 
    if (req.session.userId) {
        res.render('dashboard', { userName: req.session.userName }); // Render dashboard page if the user is logged in
    } else {
        res.redirect('/login'); // If not logged in, redirect to login page
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => { // Destroy session on logout
        if (err) throw err;
        res.redirect('/'); // Redirecting to home page after session is destroyed
    });
});

                                                              
// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3000');
});

/* 
    Flow of the application:

    1. User accesses the registration page (/register).
    2. User enters their credentials and submits the form; a POST request is sent to /register.
    3. The server adds the user data to the database and redirects the user to the login page (/login).
    
    4. User accesses the login page (/login).
    5. User enters their email and password; a POST request is sent to /login.
    6. The server checks if the email and password match the database records:
       - If matched, the user is redirected to the dashboard (/dashboard).
       - If not matched, an error message is displayed.

    7. On the dashboard, if the user decides to log out:
       - A GET request to /logout destroys the session.
       - The user is redirected back to the login page (/login).
*/
