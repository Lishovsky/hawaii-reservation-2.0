const mysql = require('mysql2');

exports.downloadNextThirtyDaysBusyTermins = (req, res) => {
    const connection = mysql.createConnection({
        host: process.env.DB_host,
        user: process.env.DB_user,
        password: process.env.DB_password,
        database: process.env.DB_database
    });


    const nextThirtyDays = [];
    const busyTermins = [];

    const days = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'Sobota'];

    function setDaysList() {
        for (let i = 0; i < 30; i++) {
            const date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + i)

            //hours

            connection.query(`SELECT hour FROM reservations WHERE date = '${date.toLocaleDateString("pl-PL")}'`, function (error, results, fields) {
                if (error) throw error;
                else {

                    const busy = [];
                    results.forEach(element => {
                        busy.push(element.hour);
                    })

                    busyTermins.push(
                        {
                            data: date.toLocaleDateString("pl-PL"),
                            hours: busy
                        }
                    );


                    if (days[date.getDay()].toUpperCase() == 'sobota'.toUpperCase()) {

                        let busyTerminsCount = 12 - busyTermins[i]['hours'].length

                        if (busyTerminsCount < 0) {
                            busyTerminsCount = 0
                        }

                        nextThirtyDays.push({
                            date: date.toLocaleDateString("pl-PL"),
                            day: days[date.getDay()],
                            termins: ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30'],
                            freeTermins: busyTerminsCount,
                            busyTermins: busyTermins[i]['hours']
                        })
                    }
                    else if (days[date.getDay()].toUpperCase() == 'niedziela'.toUpperCase()) {

                        let busyTerminsCount = 0 - busyTermins[i]['hours'].length

                        if (busyTerminsCount < 0) {
                            busyTerminsCount = 0
                        }

                        nextThirtyDays.push({
                            date: date.toLocaleDateString("pl-PL"),
                            day: days[date.getDay()],
                            termins: [],
                            freeTermins: busyTerminsCount,
                            busyTermins: busyTermins[i]['hours']
                        })
                    }
                    else {

                        let busyTerminsCount = 20 - busyTermins[i]['hours'].length

                        if (busyTerminsCount < 0) {
                            busyTerminsCount = 0
                        }

                        nextThirtyDays.push({
                            date: date.toLocaleDateString("pl-PL"),
                            day: days[date.getDay()],
                            termins: ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'],
                            freeTermins: busyTerminsCount,
                            busyTermins: busyTermins[i]['hours']
                        })

                    }
                }
                if (i == 29) {

                    res.json({ nextThirtyDays });
                }
            })
        }

    }

    setDaysList()

    //NOT WORKING. MAYBE SOMEBODY KNOW WHY?
    // new Promise((resole, reject) => {
    //     setDaysList()
    //         resole()
    // }).then(() => {
    // res.json({ nextThirtyDays });
    // })

}