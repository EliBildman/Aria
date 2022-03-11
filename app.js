const express = require('express');
const app = express();
const cors = require('cors');

//managers
const schedule_manager = require('./managers/schedule-manager');
const event_manager = require('./managers/event-manager');


//initialize user events and schedules
schedule_manager.initialize_schedules();
event_manager.initialize_events();

//initialize system triggers
event_manager.initialize_system_triggers();

//heads
const heads = require('./heads/cataloag');

//initialize controlers
heads.heads.forEach((head) => {
    head.initialize();
})

const port = 3000;

//middleware
const http_event = require('./middlewares/http-event');
const http_log = require('./middlewares/http-log');
const fileUpload = require('express-fileupload');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(fileUpload())

const corsOptions ={
    origin: '*', 
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(http_log);
// app.use(http_event);

//routes
const io_router = require('./routes/io-router');
const schedule_router = require('./routes/schedule-router');
const routine_router = require('./routes/routine-router');
const event_router = require('./routes/event-router');
const action_router = require('./routes/action-router');
const script_router = require('./routes/script-router');

app.use('/io', io_router);
app.use('/schedules', schedule_router);
app.use('/routines', routine_router);
app.use('/events', event_router);
app.use('/actions', action_router);
app.use('/scripts', script_router);

//index
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.listen(port, () => console.log(`Hosted on port ${port}`));