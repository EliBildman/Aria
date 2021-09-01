const express = require('express');
const router = express.Router();


router.post('/room-active', (req, res) => {
    let d = new Date(); // maybe use to log
    res.end('OK');
});

router.get('/foo', (req, res) => {
    res.end('OK');
});

router.get('/bar', (req, res) => {
    res.end('OK');
});

module.exports = router;