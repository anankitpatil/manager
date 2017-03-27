// app/routes.js

module.exports = function (app, passport) {

    // home page
    app.get('/', function (req, res) {
        res.render('index.ejs', {
            user: req.user,
            meta: {
                name: 'Manager',
                title: 'Manager: A minimal node CMS',
                url: 'http://localhost:3000',
                author: 'Ankit Patil',
                description: 'Manager is a minimal CMS built on Node and Express with the help of Bootstrap.'
            }
        });
    });

    // login page
    app.get('/manager', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', {
            message: req.flash('loginMessage'),
            user: req.user,
            meta: {
                name: 'Manager',
                title: 'Manager: A minimal node CMS',
                url: 'http://localhost:3000',
                author: 'Ankit Patil',
                description: 'Manager is a minimal CMS built on Node and Express with the help of Bootstrap.'
            }
        });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard',
        failureRedirect: '/manager',
        failureFlash: true
    }));

    // sign up page
    app.get('/register', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('register.ejs', {
            message: req.flash('signupMessage')
        });
    });

    // process the signup form
    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/register',
        failureFlash: true
    }));

    // profile page
    app.get('/dashboard', isLoggedIn, function (req, res) {
        res.render('dashboard.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // logout
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
