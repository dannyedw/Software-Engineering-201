var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
	req.session.user = null;
    req.session.save((err) => {
        if (err) throw err;
        req.session.regenerate((err) => {
            if (err) throw err;
            res.redirect('/');
        });
    });
});

module.exports = router;
