var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser')
var app = express();
var server = http.createServer(app);
var port = "3000";
app.set('port', port);
server.listen(port);

io = require('socket.io')(server);

var routes = require('./routes/index');
app.use('/', routes);

server.on('error', onError);
server.on('listening', onListening);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'jsonBulut'
});

global.yeniVeri;
dataGetir = function() {
    console.log("dataGetir Çağrıldı");
    //connection.connect();
    connection.query ('select *from kisiler', function (error, results, fields) {
        if (error) throw error;
        global.yeniVeri = results;
        console.log("yeni veri : " + results);
    });
    //connection.end();
    console.log("data getir çalıştı");
};
dataGetir();

app.post('/', function (req, res) {
    var adi = req.body.adi;
    var soyadi = req.body.soyadi;

    connection.query('INSERT INTO kisiler VALUES (null, "'+adi+'", "'+soyadi+'", now() ) ', function(error) {
        if (error) {
            console.log(error.message);
        } else {
            console.log('success');
        }
    });

    connection.query ('select *from kisiler', function (error, results, fields) {
        if (error) throw error;
        global.yeniVeri = results;
        console.log("yeni veri : " + results);
        io.emit('name', { yeniVeri });
    });
    res.send('Mysql Insert Successful');
    console.log("Kişi Ekle Tıklandı");
    console.log("Gelen Veriler: %s %s", adi, soyadi);
    //res.setHeader('Location', 'http://localhost:3000/');
});


io.on('connection', function (socket) {
    dataGetir();
    console.log("Bir Client Bağlandı");
    socket.on('event_name', function (data) {
        console.log("Client Gelen Data : " + data);
        connection.query ('select *from kisiler', function (error, results, fields) {
            if (error) throw error;
            global.yeniVeri = results;
            console.log("yeni veri : " + results);
            io.sockets.emit('name', { yeniVeri });
        });
    });
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}



function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    //debug('Listening on ' + bind);
    console.log('Listening on ' + bind);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


module.exports = app;
