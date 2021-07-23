
const send_req = () => {
    $.post({
        url: '/io/test',
        data: "",
        success: console.log,
        contentType: 'application/json'
    });
};