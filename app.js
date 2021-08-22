const express = require('express');
const app = express();
const cors = require('cors');

const schedule_manager = require('./events/schedule-manager');
const event_manager = require('./events/event-manager');

schedule_manager.initialize_schedules();
event_manager.initialize_events();

const port = 3000;

//middleware
const http_event = require('./middlewares/http-event');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const corsOptions ={
    origin: '*', 
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(http_event);

//routes
const io_router = require('./routes/io-router');
const schedule_router = require('./routes/schedule-router');
const routine_router = require('./routes/routine-router');
const event_router = require('./routes/event-router');
const action_router = require('./routes/action-router');

app.use('/io', io_router);
app.use('/schedules', schedule_router);
app.use('/routines', routine_router);
app.use('/events', event_router);
app.use('/actions', action_router);



//index
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


app.listen(port, () => console.log(`Hosted on port ${port}`));