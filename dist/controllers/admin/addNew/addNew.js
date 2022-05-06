const mysql = require('mysql2');

exports.addNew = (req, res) => {
    const connection = mysql.createConnection({
        host: process.env.DB_host,
        user: process.env.DB_user,
        password: process.env.DB_password,
        database: process.env.DB_database
    });

    const { name, termin, mail, service, phone, day } = req.query;

    connection.query(`SELECT * FROM reservations WHERE date = '${day}' AND hour = '${termin}'`, function (error, results, fields) {
        if (error) {
            message = 'Wystąpił błąd w bazie związany z sprawdzeniem dostępności terminu. Zgłoś to administratorowi'
            res.json({ message });
        }
        else {
            if (results.length > 0) {
                message = `Podany termin okazuje się być niedostępny. Zgłoś błąd do administratora.`;
                res.json({ message });
            }
            else {
                connection.query(`INSERT INTO reservations (names, phone, mail, service, hour, date)
                VALUES ('${name}', '${phone}', '${mail}', '${service}', '${termin}', '${day}');`, function (error, results, fields) {
                    if (error) {
                        message = 'Wystąpił błąd w bazie danych związany dodaniem rezerwacji. Zgłoś to do Administratora!'
                    }
                    else {
                        message = `Dodano rezerwacje w dniu ${day} o godzinie ${termin}.`;
                    }
                    res.json({ message });
                })
            }
        }
    })

}