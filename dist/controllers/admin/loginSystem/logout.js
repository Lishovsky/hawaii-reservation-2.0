
exports.logout = (req, res) => {
    if (req.session.loggedin == true) {
        req.session.loggedin = false;
    }
    res.redirect('/administrator');
};
