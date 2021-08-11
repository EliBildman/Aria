
const send_req = () => {
    $.ajax({
        url: '/schedules',
        type: 'DELETE',
        data: {
            ID: 1
        },
        success: console.log
    });
};


const send_req2 = () => {
    $.ajax({
        url: '/schedules',
        type: 'POST',
        data: JSON.stringify({
            "ID": 1,
            "name": "Foo numba 2",
            "cron_string": "* * * 1 1 1",
            "routines": []
        }),
        success: console.log,
        contentType: 'application/json'
    });
};