const mysql = require('mysql2');
var module = require('serwersms.pl');
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv').config();

exports.addToDb = (req, res) => {
    const connection = mysql.createConnection({
        host: process.env.DB_host,
        user: process.env.DB_user,
        password: process.env.DB_password,
        database: process.env.DB_database
    });

    const mail = req.body.mail;
    const name = req.body.name;
    const hour = req.body.hour;
    const date = req.body.date;
    const number = req.body.number;
    const service = req.body.service;
    let text;

    function sendMail() {
        sgMail.setApiKey(process.env.MAILKEY);
        const msg = {
            to: `${mail}`,
            from: 'potwierdzenie@hawaii-katowice.pl',
            subject: 'Potwierdzenie wizyty w Hawaii Katowice!',
            html: `
            <div style="background: #FFF0E3; text-align: center; font-family: 'Montserrat', sans-serif; padding: 30px 20px; text-transform: uppercase;">
                <img src="https://hawaii-katowice.pl/logo.svg" alt="logo hawaii">
                <h1 style="font-weight: 600; font-size: 16px; margin-top: 20px;">Potwierdzenie wizyty</h1>
                <h2 style="color: #CF9D75;">Twoja wizyta została dodana!</h2>
                <p style="font-weight: 500; font-size: 16px;"><b>Cześć ${name}!</b> <br><br>
    
                Potwierdzamy Twoją wizytę w naszym salonie opalania natryskowego!<br> Zapraszamy w dniu ${date} o godzinie ${hour}. Czekamy na ciebie w Hawaii Katowice, ul. Hierowskiego 2.<br><br>
    
                Do zobaczenia!</p>
                <h3 style="font-weight: 600; font-size: 13px; margin: 30px 0px;  color: #CF9D75;">W przypadku braku możliwości przyjścia pamiętaj o odwołaniu wizyty za pośrednictwem nr. telefonu: 789 379 850</h3>
                <p style="font-size: 11px; font-weight: 500;">Wiadomość wygenerowana automatycznie. Prosimy na nią nie odpowiadać.<br> W przypadku jakichkolwiek pytań zapraszamy do kontaktu telefonicznego lub osobistego w godzinach podanych na stronie www.hawaii-katowice.pl.</p>
            </div>`,
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
                const toOwner = {
                    to: 'kontakt@hawaii-katowice.pl',
                    // to: 'agencja@colorblue.pl',
                    from: 'potwierdzenie@hawaii-katowice.pl',
                    subject: `Nowa wizyta w dniu ${date}`,
                    html: `
                     <div style="background: #FFF0E3; text-align: center; font-family: 'Montserrat', sans-serif; padding: 30px 20px; text-transform: uppercase;">
                    <img src="https://hawaii-katowice.pl/logo.svg" alt="logo hawaii">
                    <h1 style="font-weight: 600; font-size: 16px; margin-top: 20px;">Powiadomienie o nowej wizycie</h1>
                    <h2 style="color: #CF9D75;">Nowa wizyta w dniu ${date}</h2>
                    <p style="font-weight: 500; font-size: 16px;">
                
                    Pojawiła się nowa wizyta<br><br>
                    Imię i nazwisko: ${name},<br>
                    w dniu: ${date},<br>
                    o godzinie: ${hour}.<br> 
                    </p>
                    <h3 style="font-weight: 600; font-size: 13px; margin: 30px 0px;  color: #CF9D75;">Dane kontaktowe ze względów bezpieczeństwa nie są tutaj umieszczone.<br> Jeśli potrzebujesz więcej informacji - sprawdź panel administracyjny.</h3>
                    <p style="font-size: 11px; font-weight: 500;">Wiadomość wygenerowana automatycznie. Prosimy na nią nie odpowiadać.</p>
                    </div>`,
                }


                sgMail
                    .send(toOwner)
                    .then(() => {
                        console.log('Email sent')
                        res.redirect('/status/?status=sukces');
                    })
                    .catch((error) => {
                        console.log('trzeci etap (błąd z wysłaniem e-maila do właściciela): ', error);
                        res.redirect('/status/?status=niepowodzenie');
                    })

            })
            .catch((error) => {
                console.log('trzeci etap (błąd z wysłaniem e-maila do klienta): ', error);
                res.redirect('/status/?status=niepowodzenie');
            })
    }

    function sendSMS() {
        text = `Cześć ${name}! Potwierdzamy Twoją wizytę w Hawaii Katowice! Czekamy na Ciebie w dniu ${date} o godzinie ${hour} w naszym salonie na ul. Hierowskiego 2 w Katowicach. Do zobaczenia!`

        try {
            var object = module.serwerSMS(process.env.SMSLOGIN, process.env.SMSPASSWORD);
            var messages = object.oMessages;
            var params = new Object();

            params.phone = [number];
            params.text = text;
            params.sender = 'Hawaii';
            params.details = true;
            params.test = false;

            var callback = function (data) {
                var obj = JSON.parse(data);
                console.log(obj);
                sendMail()
            }

            messages.sendSms(params, callback);

        } catch (err) {
            console.log('drugi etap (błąd w wysłaniu SMS): ', error);
            res.redirect('/status/?status=niepowodzenie');
        }
    }

    connection.query(`SELECT * FROM reservations WHERE date = '${date}' AND hour = '${hour}'`, function (error, results, fields) {
        if (error) {
            console.log('pierwszy etap (zapytanie o ilość): ', error);
            res.redirect('/status/?status=niepowodzenie');
        }
        else {
            if (results.length > 0) {
                console.log('pierwszy etap (rekord istnieje): ', error);
                res.redirect('/status/?status=niepowodzenie');
            }
            else {
                connection.query(`INSERT INTO reservations (names, phone, mail, service, hour, date)
                VALUES ('${name}', '${number}', '${mail}', '${service}', '${hour}', '${date}');`, function (error, results, fields) {
                    if (error) {
                        console.log('pierwszy etap (błąd w dodawaniu): ', error);
                        res.redirect('/status/?status=niepowodzenie');
                    }
                    else {
                        sendSMS()
                    }
                })
            }
        }
    })
}