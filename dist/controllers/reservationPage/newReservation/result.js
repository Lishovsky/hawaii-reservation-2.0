const path = require('path');

exports.result = (req, res) => {
    res.sendFile(path.join(__dirname, '../../../status/result.html'));
};
