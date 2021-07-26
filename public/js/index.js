
const send_req = () => {
    $.post({
        url: '/io/test1',
        data: "",
        success: console.log,
        contentType: 'application/json'
    });
};


const send_req2 = () => {
    $.post({
        url: '/io/test2',
        data: "",
        success: console.log,
        contentType: 'application/json'
    });
};