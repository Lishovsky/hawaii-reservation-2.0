require('dotenv');
const mysql = require('mysql2');

exports.auth = (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    const connection = mysql.createConnection({
        host: process.env.DB_host,
        user: process.env.DB_user,
        password: process.env.DB_password,
        database: process.env.DB_database
    });

    connection.query(`SELECT * FROM accounts WHERE username = '${login}'`, function (error, results, fields) {
        if (error) throw error;
        else if (results.length > 0) {
            if (results[0]['password'] == password) {
                req.session.username = results[0]['username'];
                req.session.loggedin = true;
                res.redirect('/panel');
            }
            else {
                res.redirect('/administrator/?error=wrongData');
            }
        }
        else {
            res.redirect('/administrator/?error=wrongData');
        }
    })

    connection.end();
}
