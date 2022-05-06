const mysql = require('mysql2');

exports.remove = (req, res) => {
    const connection = mysql.createConnection({
        host: process.env.DB_host,
        user: process.env.DB_user,
        password: process.env.DB_password,
        database: process.env.DB_database
    });

    const { termin, day } = req.query;

    let message;

    connection.query(`delete from reservations where date ='${day}' and hour = '${termin}'`, function (error, results, fields) {
        if (error) {
            message = 'Wystąpił błąd w bazie danych związany anulacją wizyty! Zgłoś to do Administratora!'
        }
        else {
            message = `Anulowano rezerwacje: ${termin} w dniu ${day}.`;
        }
        res.json({ message });
    })
}