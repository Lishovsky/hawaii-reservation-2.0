const path = require('path');

exports.login = (req, res) => {
    if (req.session.loggedin == true) {
        res.redirect('/panel');
    }
    else {
        res.sendFile(path.join(__dirname, '../../../loginPage/loginPage.html'));
    }
};
