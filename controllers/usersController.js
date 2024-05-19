const User = require("../models/userModel.js");
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports.signUp = async (req, res, next) => {
    try {
        let { userName, email, password } = req.body;
        const newUser = new User({
            email,
            username: userName
        });
        let registeredUser = await User.register(newUser, password);
        res.status(201).json({ message: "User registered successfully", user: registeredUser });
    } catch (e) {
        next(e); // Pass the error to the error handling middleware
    }
};



module.exports.logIn = async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        try {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ message: 'Incorrect username or password' });
            }
            req.logIn(user, async (err) => {
                if (err) {
                    return next(err);
                }
                // Generate JWT with user information
                const token = jwt.sign({ userId: user._id, username: user.username, email: user.email }, 'your_secret_key_here', { expiresIn: '1h' });
                // Send the token and user as a response
                return res.status(200).json({ token, user });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
};



module.exports.logOut = (req, res) => {
    req.logOut((err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.locals.currentUser = null;
            res.status(200).json({ message: "Logout successful" });
        }
    });
};

// Route to get current user
module.exports.currentUser = async (req, res) => {
    const User = await res.locals.currentUser
    res.json({ currentUser: User });
};

