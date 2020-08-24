const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const async = require("async");
const app = express();
const { connect } = require('./app/lib/config')

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function parallel(middlewares) {
    return function (req, res, next) {
        async.each(middlewares, function (mw, cb) {
            mw(req, res, cb);
        }, next);
    };
}

app.use(parallel([
    express.static(path.join(__dirname, 'dist')),
    express.static(path.join(__dirname, 'uploads')),
    compression(),
    bodyParser.json({limit: '50mb'}),
    bodyParser.urlencoded({limit: '50mb', extended: true})
]));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'));
})

connect('backend')
require('./app/routes')(app)

var port = 8000;
app.listen(port,function(){
    console.log("server running on localhost:" + port);
});