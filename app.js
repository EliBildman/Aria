const express = require('express');
const app = express();
const routine_manager = require('./events/routine-manager');

routine_manager.register_routines();

const port = 3000;

//middleware
const http_event = require('./events/http-event');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(http_event);

//routes
const io_router = require('./routes/io-router');
const web_router = require('./routes/web-router');

app.use('/io', io_router);
app.use(web_router);


//index
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


app.listen(port, () => console.log(`Hosted on port ${port}`));