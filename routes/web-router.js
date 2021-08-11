const express = require('express');
const router = express.Router();
const fs = require('fs');

// const schedule = require('../configs/schedule')



router.get('/foo', (req, res) => {
    res.end('BAR');
});



module.exports = router;