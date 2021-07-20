const express = require('express');
const router = express.Router();


router.get('/foo', (req, res) => {
    res.end('BAR');
});

module.exports = router;