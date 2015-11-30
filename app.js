var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
var browserify = require('browserify')
var vueify = require('vueify')
var hmr = require('browserify-hmr');

var main = browserify('./public/main.js').plugin(hmr)

var router = express.Router();

var fs = require("fs");

router.get('/', function(req, res, next) {
  var str = fs.readFileSync("app.vue", "utf-8");
  res.json({ contents: str });
});
router.post("/", function(req, res, next){
  fs.writeFileSync("app.vue", req.body.contents, "utf-8");
  updateBundle();
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

function updateBundle(){
    main.transform(vueify)
      .bundle()
      .pipe(fs.createWriteStream("public/bundle.js"))
}

updateBundle();

module.exports = app;
