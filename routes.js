const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('cookie-session');
const dotenv = require('dotenv').config();
var path = require('path');

router.use(express.static
    (path.join(__dirname, '/dist'),
));

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(session({ secret: 'secret', resave: true, saveUninitialized: true, expires: 60000 }));

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//reservation system
const home = require('./dist/controllers/reservationPage/page/home.js');
router.get('/', home.home);

//add reservation 
const addToDb = require('./dist/controllers/reservationPage/newReservation/addToDb.js');
router.post('/addToDb', addToDb.addToDb);

const result = require('./dist/controllers/reservationPage/newReservation/result.js');
router.get('/status', result.result);

//download data
const downloadNextThirtyDaysBusyTermins = require('./dist/controllers/reservationPage/downloadData/downloadNextThirtyDaysBusyTermins.js');
router.get('/nextThirtyDaysBusyTermins', downloadNextThirtyDaysBusyTermins.downloadNextThirtyDaysBusyTermins);

//admin panel
//--login stystem--
const auth = require('./dist/controllers/admin/loginSystem/auth.js');
router.post('/auth', auth.auth);
router.post('/administrator/auth', auth.auth);
const login = require('./dist/controllers/admin/loginSystem/login.js');
router.get('/administrator', login.login);
const logout = require('./dist/controllers/admin/loginSystem/logout.js');
router.get('/logout', logout.logout);

//--admin panel
const panel = require('./dist/controllers/admin/panel/panel.js');
router.get('/panel', panel.panel);
const downloadData = require('./dist/controllers/admin/panel/downloadData.js');
router.get('/downloadData', downloadData.downloadData);
const downloadHoursOfDay = require('./dist/controllers/admin/panel/downloadHoursOfDay.js');
router.get('/downloadHoursOfDay', downloadHoursOfDay.downloadHoursOfDay);

const remove = require('./dist/controllers/admin/remove/remove.js');
router.get('/remove', remove.remove);
const visitCount = require('./dist/controllers/admin/visitCount/visitCount.js');
router.get('/visitCount', visitCount.visitCount);
const block = require('./dist/controllers/admin/block/block.js');
router.get('/block', block.block);
const message = require('./dist/controllers/admin/message/message.js');
router.get('/sendMessage', message.message);
const addNew = require('./dist/controllers/admin/addNew/addNew.js');
router.get('/addNew', addNew.addNew);


module.exports = router;