var express = require('express');
var router = express.Router();
var Chance = require('chance'),
    chance = new Chance();

// Container for issues
var issues = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'JS Issue Tracker', issues: issues });
});

/* POST issue. */
router.post('/', function(req, res, next) {
  var issue = {
      id: chance.guid(),
      description: req.body.description,
      severity: req.body.severity,
      assign: req.body.assign,
      open: true
  };
  issues.push(issue);
  res.render('index', { title: 'JS Issue Tracker', issues: issues });
});

/* close */
router.put('/:id', function(req, res, next){
    //find index of issue
    var index = issues.findIndex(function(i){
        return i.id ===  req.params.id
    });
    //changed status
    issues[index].open = false;
    res.render('index', { title: 'JS Issue Tracker', issues: issues });
});

/* Delete */
router.delete('/:id', function(req, res, next){
    //find index of issue
    var index = issues.findIndex(function(i){
        return i.id ===  req.params.id
    });
    //remove from array
    issues.splice(index, 1);
    res.render('index', { title: 'JS Issue Tracker', issues: issues });
});

module.exports = router;
