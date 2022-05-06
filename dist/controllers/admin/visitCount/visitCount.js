const mysql = require('mysql2');

exports.visitCount = (req, res) => {
    const connection = mysql.createConnection({
        host: process.env.DB_host,
        user: process.env.DB_user,
        password: process.env.DB_password,
        database: process.env.DB_database
    });

    const { name } = req.query;

    let message;

    connection.query(`SELECT * FROM reservations WHERE names = '${name}'`, function (error, results, fields) {
        if (error) {
            message = 'Wystąpił błąd w bazie danych związany ze sprawdzaniem wizyty! Zgłoś to do Administratora!'
        }
        else {
            if (results.length > 0) {
                if (results.length == 1) {
                    message = `To pierwsza wizyta klienta: ${name}`;
                }
                else {
                    message = `Znaleziono ${results.length} wizyt/wizyty dla klienta: ${name}`;
                }
            }
            else {
                message = `Nie znaleziono żadnych wizyt klienta: ${name}`
            }
        }
        res.json({ message });
    })
}