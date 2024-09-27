const express = require("express"); // requiring express package
const db = require("./routes/database"); // requiring database which is in database.js file
const path = require("path"); // requiring path for static files (static files are resources like images, CSS, and JS that don't change)
const session = require('express-session'); // requiring session to store info across various pages; a session is created on login
const app = express();    
const bodyParser = require('body-parser');                           
const port = 3000;
const methodOverride = require('method-override');
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173', // React app's address
    credentials: true // 
}));

app.use(bodyParser.json());

app.use(methodOverride('_method')); // This allows you to use _method to simulate PUT and PATCH


// Middleware
app.use(express.static(path.join(__dirname, "public"))); // Serving static files from "public" directory
app.set("view engine", "ejs"); // Setting view engine to EJS for rendering HTML templates
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded form data
app.use(express.json()); // For parsing JSON data if needed

// **Setup express-session middleware**
app.use(session({
    secret: 'nan@&1234', // Replace with a strong secret key
    resave: false, // Don't save session if unmodified
    saveUninitialized: true, // Don't create a session until something is stored
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
app.get('/register/user', (req, res) => {
    res.render('registerUser'); // Rendering the registration page
});

app.get('/register/vendor' , (req,res)=>{
    res.render("registerVendor");
})

// Login route
app.get('/login/user', (req, res) => {
    res.render('loginUser'); // Rendering the login page                       
});

app.get('/login/vendor', (req, res) => {
    res.render('loginVendor'); // Rendering the login page                       
});

// Adding new user
app.post('/register/user', (req, res) => {
    const { userID, userName, userEmail, userPassword, userPhoneNumber , userAddress} = req.body;

    if (!userID || !userName || !userEmail || !userPassword || !userPhoneNumber || !userAddress) {
        return res.send('All fields are required!');
    }

    // Insert the new user into the database
    db.query('INSERT INTO user (userId, userName, userEmail, userPassword, userPhoneNumber, userAddress) VALUES (?, ?, ?, ?, ? ,?)', 
    [userID, userName, userEmail, userPassword, userPhoneNumber , userAddress], (err, result) => {
        if (err) throw err;
        res.redirect('/login/user'); // After successfully adding the entries, redirecting to login page
    });
});

app.post('/register/vendor', (req, res) => {
    const { vendorID, vendorName, vendorPhoneNumber, vendorAddress, vendorPassword , vendorEmail} = req.body;

    if (!vendorID || !vendorName  || !vendorPhoneNumber || !vendorAddress || ! vendorPassword  || !vendorEmail) {
        return res.send('All fields are required!');
    }

    // Insert the new user into the database
    db.query('INSERT INTO Vendors (vendorID, vendorName, vendorPhoneNumber , vendorAddress , vendorPassword , vendorEmail) VALUES (?, ?, ?, ?,?,?)', 
    [vendorID, vendorName, vendorPhoneNumber , vendorAddress, vendorPassword , vendorEmail], (err, result) => {
        if (err) throw err;
        res.redirect('/login/vendor'); // After successfully adding the entries, redirecting to login page
    });
});

// Handling user login

// Handling user login
app.post('/login/user', (req, res) => {
    const { userEmail, userPassword } = req.body;

    console.log('Request Body:', req.body);
    console.log('Email entered:', userEmail);
    console.log('Password entered:', userPassword);

    db.query('SELECT * FROM user WHERE userEmail = ? AND userPassword = ?', [userEmail, userPassword], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'An error occurred, please try again.' });
        }

        console.log('Database results:', results);

        if (results.length > 0) {
            req.session.userID = results[0].userID;
            req.session.userName = results[0].userName;
            req.session.userEmail = results[0].userEmail;
            req.session.userPassword = results[0].userPassword;
            req.session.userAddress = results[0].userAddress;
            req.session.userPhoneNumber = results[0].userPhoneNumber;
            console.log('Session after login:', req.session);

            res.json({ user: req.session.userName }); // Return user data
        } else {
            res.status(401).json({ message: 'Incorrect email or password' });
        }
    });
});


//vendor login
app.post('/login/vendor', (req, res) => {
    const { vendorPassword , vendorEmail } = req.body;


    db.query('SELECT * FROM Vendors WHERE vendorPassword = ? AND vendorEmail = ?', [vendorPassword , vendorEmail], (err, results) => {
        if (err) {
            console.error('Database error:', err); // Log database error
            return res.send('An error occurred, please try again.');
        }

        console.log('Database results:', results);  // Log the results from the database

        if (results.length > 0) {
            // Corrected: Match the field name with database key 'userID'
            req.session.vendorID = results[0].vendorID;  // If login successful, create a session
            req.session.vendorName = results[0].vendorName;
            console.log('Session after login:', req.session); // Log session details
            res.redirect('/'); // Successfully redirecting to dashboard
        } else{
            res.send("Incorrect password and email");
        }
    });
});


// // Dashboard route
// app.get('/dashboard', (req, res) => {
//     console.log('Session on dashboard:', req.session); 
//     if (req.session.userID) {
//         res.render('dashboard', { userName: req.session.userName }); // Render dashboard page if the user is logged in
//     } else {
//         res.redirect('/login'); // If not logged in, redirect to login page
//     }
// });



//home route
app.get("/user/view" , (req,res)=>{
    res.render('homeUser', {userID:req.session.userID , userName:req.session.userName});
});

// view profile
app.get("/user/profile", (req, res) => {
    
    console.log("view",req.session);
    console.log(req.session.userEmail);
    console.log("VIEW" ,req.params);
    
    res.render('profile', {userID: req.session.userID,
        userName: req.session.userName,
        userEmail: req.session.userEmail,
        userAddress: req.session.userAddress,
        userPhoneNumber: req.session.userPhoneNumber,
        userPassword : req.session.userPassword});
});

//edit 
app.get('/user/edit', (req, res) => {
    if (!req.session.userID) {
        return res.redirect('/login/user'); // Redirect to login if user is not logged in
    }
    
    // Fetch user profile details from the session
    const { userID, userName, userEmail, userAddress, userPhoneNumber, userPassword } = req.session;

    res.render('edit', { userID, userName, userEmail, userAddress, userPhoneNumber, userPassword });
});

//update profile
app.patch('/user/edit', (req, res) => {
    console.log('Session at /user/edit:', req.session);
    const { formPassword, newUserName, newUserEmail, newUserAddress, newUserPhoneNumber } = req.body;
    const userID = req.session.userID; // Use session userID to identify which user to update
    console.log('Session data in edit profile:', req.session); 
  console.log(userID);
  //console.log(userName);
    // Validate that all required fields are provided
    if (!formPassword || !newUserName || !newUserEmail || !newUserAddress || !newUserPhoneNumber) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Query to find the user by userID
    const query = 'SELECT * FROM user WHERE userID = ?';

    db.query(query, [userID], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ message: 'An error occurred, please try again.' });
        }
       console.log("Results", results);
        // Check if user exists
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const user = results[0];
        
        // Check if the provided password matches the stored password
        if (user.userPassword !== formPassword) {
            return res.status(403).json({ message: 'Incorrect password.' });
        }

        // Update user details if password is correct
        const updateQuery = 'UPDATE user SET userName = ?, userEmail = ?, userAddress = ?, userPhoneNumber = ? WHERE userID = ?';
        
        db.query(updateQuery, [newUserName, newUserEmail, newUserAddress, newUserPhoneNumber, userID], (updateError) => {
            if (updateError) {
                console.error('Update error:', updateError);
                return res.status(500).json({ message: 'An error occurred, please try again.' });
            }
            // Update session data
            req.session.userName = newUserName;
            req.session.userEmail = newUserEmail;
            req.session.userAddress = newUserAddress;
            req.session.userPhoneNumber = newUserPhoneNumber;

           

            // Redirect to profile page after successful update
            res.redirect('/user/profile');
        });
    });
});
                                                        
// Start the server
app.listen(3000, () => {

    console.log('Server is running on port 3000');
}); 

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => { // Destroy session on logout
        if (err) throw err;
        res.redirect('/'); // Redirecting to home page after session is destroyed
    });
});

