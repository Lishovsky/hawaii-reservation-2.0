var module = require('serwersms.pl');
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv').config();

exports.message = (req, res) => {
    const { name, termin, phone, day } = req.query;

    let message;
    let text;

    if (phone.length > 9 || phone.length < 9) {
        message = 'Numer telefonu ma nieprawidłową długość. Wysłanie powiadomienia jest niemożliwe.';
        res.json({ message });
    }
    else {
        text = `Cześć ${name}! Przypominamy o wizycie w Hawaii-katowice! Czekamy na Ciebie w dniu ${day} o godzinie ${termin} w naszym salonie na ul. Hierowskiego 2 w Katowicach. Do zobaczenia!`

        try {
            var object = module.serwerSMS(process.env.SMSLOGIN, process.env.SMSPASSWORD);
            var messages = object.oMessages;
            var params = new Object();

            params.phone = [phone];
            params.text = text;
            params.sender = 'Hawaii';
            params.details = true;
            params.test = false;

            var callback = function (data) {

                var obj = JSON.parse(data);
                console.log(obj);
                message = 'Przypomnienie wysłane!'
                res.json({ message });


            }

            messages.sendSms(params, callback);

        } catch (err) {

            message = 'Wystąpił błąd w wysyłaniu SMS ze strony dostawcy usługi! Zgłoś to do administratora!'
            res.json({ message });

        }
    }
}
