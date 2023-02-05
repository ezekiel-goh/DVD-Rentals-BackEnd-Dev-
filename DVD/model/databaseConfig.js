//Ezekiel Goh
//P2205881
//DIT/FT/1B/08
var mysql = require("mysql");

var dbconnect = {
  getConnection: function() {
    var conn = mysql.createConnection({
      host: "localhost",
      user: "bed_dvd_root",
      password: "pa$$woRD123",
      database: "bed_dvd_db",
      dateStrings: true,
      multipleStatements: true
    });
    
    return conn;
    
  },
};

module.exports = dbconnect;
