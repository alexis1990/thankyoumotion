// SETUP
// =============================================================================

// Packages
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var User     = require('./app/models/authors');
var Book     = require('./app/models/books');
var morgan      = require('morgan');
var jwt    = require('jsonwebtoken');

//Connect to DB
var config = require('./config'); // get our config file
mongoose.connect(config.database); // connect to database
app.set('secretSecret', config.secret); // secret variable

// JSON Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use morgan to log requests to the console
app.use(morgan('dev'));

app.use(express.static('app/public'));

// PORT
var port = process.env.PORT || 8080;

// ROUTES
// =============================================================================

var router = express.Router();

// Middleware
router.use(function(req, res, next) {
    console.log('Action');
    next();
});

// Get
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

//POST AUTHORS
router.route('/authors')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        // Create an authors
        var authors = new User({
            name: req.body.username,
            password: req.body.password,
            admin: true
        });

        // save the sample user
        authors.save(function(err) {
            if (err) throw err;

            console.log('User saved successfully');
            res.json({ success: true });
        });
    })

    .get(function(req, res) {
        User.find({}, function(err, users) {
            res.json(users);
        });
    });

//AUTHENTIFICATION AUTHORS
router.route('/authenticate')
    .post(function(req, res) {

    // find the user
    User.findOne({
        name: req.body.username
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('secretSecret'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    token: token
                });
            }

        }

    });
});

// Route middleware to verify a token
router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('secretSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

//POST BOOKS
router.route('/books')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var book = new Book();
        book.name = req.body.name;

        // save the bear and check for errors
        book.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Book created!' });
        });

    })

    .get(function(req, res) {
        Book.find(function(err, books) {
            if (err)
                res.send(err);

            res.json(books);
        });
    });

router.route('/authors/:author_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Author.findById(req.params.author_id, function(err, author) {
            if (err)
                res.send(err);
            res.json(author);
        });
    })

    .put(function(req, res) {

        // use our bear model to find the bear we want
        Author.findById(req.params.author_id, function(err, author) {

            if (err)
                res.send(err);

            author.name = req.body.name;  // update the bears info

            // save the bear
            author.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Author updated!' });
            });

        });
    });

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Run on ' + port);