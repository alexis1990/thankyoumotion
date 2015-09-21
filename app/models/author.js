var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AuthorSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Author', AuthorSchema);