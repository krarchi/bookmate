var mysql = require('mysql');
var db_config = require('../config/db_config')
var jwt = require('../config/jwt_config')
var con = mysql.createConnection({
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = {
    create: async (req,res) => {
        let password = req.body.password;
        let buff = new Buffer(password);
        let encodedPass = buff.toString('base64');
        var sql = "INSERT INTO user Values ('"+req.body.firstname+"','"+req.body.lastname+"',"+req.body.mobile+",'"+req.body.email+"','"+encodedPass+"','"+req.body.address+"','"+req.body.deviceId+"','"+req.body.devicetype+"')";
        con.query(sql, function (err, result) {
            if (err) res.json({status: false, message: err});
            res.json({status: true, message: "User Created"})
        });
    },
    update: async (req,res) => {
        let password = req.body.password;
        let buff = new Buffer(password);
        let encodedPass = buff.toString('base64');
        var sql = "Update user set first_name = '"+req.body.firstname+"' , last_name = '"+req.body.last_name+"' , mobile ="+req.body.mobile+", email = '"+req.body.email+"' , password = '"+encodedPass+"' , address = '"+req.body.address+"' , device_id = '"+req.body.deviceId+"' , device_type = '"+req.body.devicetype+"' WHERE id = "+req.body.id;
        con.query(sql, function (err, result) {
            if (err) res.json({status: false, message: err});
            res.json({status: true, message: "User Updated"})
        });
        },
    get_all: async (req,res) => {
        con.query("SELECT * FROM user", function (err, result, fields) {
            if (err) res.json({status: false, message: err});
            res.json({status: true, message: "User List", data: result})
        });
    },
    login: async  (req,res) => {
        con.query("Select * from user where email = '"+ req.body.email +"'", function (err, result){
           if (err) res.json({status: false, message: "Error Loggin In:"+err});
            let buff = new Buffer(result[0].password, 'base64');
            let decodedPass = buff.toString('ascii');
            if (req.body.password === decodedPass){
                let token = jwt.generateAccessToken(req.body.email)
                res.json({status:true,message: "Login Success", token: token})
            }else{
                res.json({status: false, message: "Incorrect Password"})
            }
        });
    }
    ,
    logout: async (req,res) => {

    }
}
