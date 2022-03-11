
const initialize = () => {

}

const Print = {
    name: "Print",
    param: {
        "?field": "*string",
        "?msg": "*string",
    },
    run: (payload, param) => {
        if (param.field) {
            console.log('[Print]:', payload[param.field]);
        } else if (param.msg) {
            console.log('[Print]:', param.msg)
        } else {
            console.log('[Print]:', payload);
        }
        return payload;
    }
}

const Wait = {
    name: "Wait",
    param: {
        "ms": "*number",
    },
    run: (payload, param) => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(payload);
            }, param.ms);
        });
    }
}

const Math = {
    name: "Math",
    param: {
        "operator": "add&subtract&divide&multiply",
        "n": "*number",
        ">num": "*number",
        "<num": "*number",
    },
    run: (payload, param) => {
        if (param.operator == 'add') {
            payload.num += param.n;
        } else if (param.operator == 'subtract') {
            payload.num -= param.n;
        } else if (param.operator == 'divide') {
            payload.num /= param.n;
        } else if (param.operator == 'multiply'){
            payload.num *= param.n;
        }
        return payload;
    }
}

module.exports = {
    name: 'Util',
    initialize,
    events: [],
    actions: [
        Print,
        Wait,
        Math,
    ],
}