const mysql = require('mysql2');

exports.downloadHoursOfDay = (req, res) => {
    const connection = mysql.createConnection({
        host: process.env.DB_host,
        user: process.env.DB_user,
        password: process.env.DB_password,
        database: process.env.DB_database
    });


    const { day } = req.query;


    function downloadHours(day) {

        connection.query(`SELECT * FROM reservations WHERE date = '${day}' ORDER BY hour ASC`, function (error, results, fields) {
            if (error) throw error;
            else {
                let list = results;
                res.json({ list });

            }
        })

    }

    downloadHours(day)

}