const mysql = require('mysql2');

exports.block = (req, res) => {
    const connection = mysql.createConnection({
        host: process.env.DB_host,
        user: process.env.DB_user,
        password: process.env.DB_password,
        database: process.env.DB_database
    });

    const { termin, day } = req.query;


    let message;

    connection.query(`INSERT INTO reservations (names, phone, mail, service, hour, date)
    VALUES ('WOLNE', '0', 'WOLNE', 'WOLNE', '${termin}', '${day}');`, function (error, results, fields) {
        if (error) {
            message = 'Wystąpił błąd w bazie danych związany blokowaniem wizyty! Zgłoś to do Administratora!'
        }
        else {
            message = `Zablokowano termin: ${termin} w dniu ${day}.`;
        }
        res.json({ message });
    })
}