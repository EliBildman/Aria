
const send_req = () => {
    $.get({
        url: '/routines',
        data: {
            ID: 0
        },
        success: console.log
    });
};


const send_req2 = () => {
    $.post({
        url: '/events',
        data: JSON.stringify({
            method: "delete",
            event: {
                "ID": 1
            }
        }),
        success: console.log,
        contentType: 'application/json'
    });
};