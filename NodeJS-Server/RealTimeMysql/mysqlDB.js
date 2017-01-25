var mysql = require("mysql");
var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'jsonBulut',
    connectionLimit: 1000
});

module.exports.donData = "veri yok";
module.exports.dataGetir = function() {
    console.log("dataGetir Çağrıldı");
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            return;
        }
        connection.query("select *from kisiler",function(error, results, fields){
            if (error) throw error;
            console.log("Kisiler Çağrıldı");
            connection.release();
            console.log("Yeni Data : " + results);
            donData =  results;
        });
        connection.on('error', function(err) {
            console.log("connection error");
            return;
        });
    });

};



