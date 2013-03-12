var express = require('express'),
    fs = require('fs'),
    http = require('http');

var app = express();
var store = new express.session.MemoryStore();

app.use('/', express.static(__dirname + '/../app'));

app.use(express.cookieParser());
app.use(express.session({secret : 'the recipe website session', store: store}));

var load_json = function() {
  var recipes_json = JSON.parse(fs.readFileSync('server/data/recipes.json'));
  var lastIndex = 0;

  Object.keys(recipes_json).forEach(function(val) {
    if (lastIndex < val * 1) {
      lastIndex = val * 1;
    }
  });

  return {json : recipes_json, index: lastIndex};
}

app.use(express.bodyParser());

console.log('Starting the Recipe App on http://localhost:3000');
require('./recipeRoutes')(app, load_json);
/* Required Route Files */


app.listen(3000);

module.exports = app;
