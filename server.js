// SETUP
// =============================================================================

// Packages
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/myapp');
var Author     = require('./app/models/author');


// JSON Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

//POST
router.route('/authors')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var author = new Author();
        author.name = req.body.name;

        // save the bear and check for errors
        author.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Author created!' });
        });

    })

    .get(function(req, res) {
        Author.find(function(err, authors) {
            if (err)
                res.send(err);

            res.json(authors);
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

                res.json({ message: 'Bear updated!' });
            });

        });
    });

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Run on ' + port);