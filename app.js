var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();

var fs = require("fs");

router.get('/', function(req, res, next) {
  var str = fs.readFileSync("app.vue", "utf-8");
  res.json({ contents: str });
});
router.post("/", function(req, res, next){
  fs.writeFileSync("app.vue", req.body.contents, "utf-8");
  res.json({ result: "success" });
})

app.use('/api', router);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// ${npm_package_config_src_js} -o ${npm_package_config_dist_js} -dv
var exec = require('child_process').exec,
    child;

child = exec('watchify public/main.js -o public/bundle.js -dv -t vueify -p browserify-hmr',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});

module.exports = app;
