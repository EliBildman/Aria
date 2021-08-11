
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
        url: '/routines',
        data: JSON.stringify({
            method: "update",
            ID: 2,
            routine: {
                "name": "Foo 2!",
                "triggers": [],
                "sequence": []
            }
        }),
        success: console.log,
        contentType: 'application/json'
    });
};