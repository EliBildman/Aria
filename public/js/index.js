
const send_req = () => {
    $.post("/io/room-active", {
            "num": 10
        },
        () => {},
        "application/json"
    );
};