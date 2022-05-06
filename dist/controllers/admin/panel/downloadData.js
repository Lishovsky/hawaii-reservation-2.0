const mysql = require('mysql2');

exports.downloadData = (req, res) => {
    const connection = mysql.createConnection({
        host: process.env.DB_host,
        user: process.env.DB_user,
        password: process.env.DB_password,
        database: process.env.DB_database
    });


    const nextThirtyDays = [];
    const busyTermins = [];

    const days = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'Sobota'];

    const { ammount } = req.query;

    function setDaysList(ammount) {
        for (let i = ammount; i < ammount + 30; i++) {
            let date;
            if (i == 0) {
                date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
            }
            else {
                date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + i)
            }


            //hours

            connection.query(`SELECT hour FROM reservations WHERE date = '${date.toLocaleDateString("pl-PL")}'`, function (error, results, fields) {
                if (error) throw error;
                else {

                    const busy = [];
                    results.forEach(element => {
                        busy.push(element.hour);
                    })

                    let busyTerminsCount;

                    if (days[date.getDay()].toUpperCase() == 'sobota'.toUpperCase()) {

                        busyTerminsCount = 12 - busy.length

                        if (busyTerminsCount < 0) {
                            busyTerminsCount = 0
                        }

                        nextThirtyDays.push({
                            date: date.toLocaleDateString("pl-PL"),
                            day: days[date.getDay()],
                            termins: ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30'],
                            freeTermins: busyTerminsCount,
                            busyTermins: busy
                        })
                    }
                    else if (days[date.getDay()].toUpperCase() == 'niedziela'.toUpperCase()) {

                        busyTerminsCount = 0 - busy.length

                        if (busyTerminsCount < 0) {
                            busyTerminsCount = 0
                        }

                        nextThirtyDays.push({
                            date: date.toLocaleDateString("pl-PL"),
                            day: days[date.getDay()],
                            termins: [],
                            freeTermins: busyTerminsCount,
                            busyTermins: busy
                        })
                    }
                    else {
                        busyTerminsCount = 20 - busy.length

                        if (busyTerminsCount < 0) {
                            busyTerminsCount = 0
                        }

                        nextThirtyDays.push({
                            date: date.toLocaleDateString("pl-PL"),
                            day: days[date.getDay()],
                            termins: ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'],
                            freeTermins: busyTerminsCount,
                            busyTermins: busy
                        })

                    }
                }
                if (i == (ammount + 29)) {

                    res.json({ nextThirtyDays });
                }
            })
        }

    }

    setDaysList(parseInt(ammount))

}