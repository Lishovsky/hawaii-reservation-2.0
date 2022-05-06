const path = require('path');

exports.panel = (req, res) => {
    if (req.session.loggedin != true) {
        res.redirect('/administrator');
    }
    else {
        res.sendFile(path.join(__dirname, '../../../admin/panel.html'));
    }
};
