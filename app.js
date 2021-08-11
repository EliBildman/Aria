const express = require('express');
const app = express();
const routine_manager = require('./events/routine-manager');
const schedule_manager = require('./events/schedule-manager');

routine_manager.initialize_routines();
schedule_manager.initialize_schedules();

const port = 3000;

//middleware
const http_event = require('./middlewares/http-event');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(http_event);

//routes
const io_router = require('./routes/io-router');
const schedule_router = require('./routes/schedule-router');

app.use('/io', io_router);
app.use('/schedules', schedule_router);


//index
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


app.listen(port, () => console.log(`Hosted on port ${port}`));