module.exports = function(app, load_json, users_json){
  var json_index = load_json();
  var lastID = json_index.index + 1;
  var recipes = json_index.json;

  app.get('/api/recipe/:id', function(req, res) {
    res.send(recipes[req.params.id]);
  });

  app.get('/api/recipe', function(req, res) {
    if (req.query['ids']) {
      var ids = req.query['ids'].split(',');
      var to_send = [];
      for (var i = 0; i < ids.length; i++) {
        var rec = recipes[ids[i]];
        if (rec) {
          to_send.push(rec);
        }
      }
      res.send(to_send);
    } else {
      res.send(recipes);
    }

  });

  app.post('/api/recipe', function(req, res) {
    var recipe = req.body.recipe;
    recipe.id = lastID++;
    recipes[recipe.id] = recipe;
    res.send('Done : Created');
  });

  app.post('/api/recipe/:id', function(req, res) {
    var recipe = req.body.recipe;
    recipes[req.params.id] = recipe;
    res.send('Done : Update');
  });
};
