const { HeadLogger } = require('../loggers');

const logger = HeadLogger('UTIL');

const initialize = () => {};

const Print = {
    name: 'Print',
    param: {
        '?field': '*string',
        '?msg': '*string',
    },
    run: (payload, param) => {
        if (param.field !== undefined) {
            logger.info(`Print: ${payload[param.field]}`);
        } else if (param.msg !== undefined) {
            logger.info(`Print: ${param.msg}`);
        } else {
            logger.info(`Print: ${payload}`);
        }
        return payload;
    },
};

const Wait = {
    name: 'Wait',
    param: {
        ms: '*number',
    },
    run: (payload, param) => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(payload);
            }, param.ms);
        });
    },
};

const Math = {
    name: 'Math',
    param: {
        operator: 'add&subtract&divide&multiply',
        n: '*number',
        '>num': '*number',
        '<num': '*number',
    },
    run: (payload, param) => {
        if (param.operator == 'add') {
            payload.num += param.n;
        } else if (param.operator == 'subtract') {
            payload.num -= param.n;
        } else if (param.operator == 'divide') {
            payload.num /= param.n;
        } else if (param.operator == 'multiply') {
            payload.num *= param.n;
        }
        return payload;
    },
};

const SetField = {
    name: 'SetField',
    param: {
        key: '*string',
        value: '*string',
        type: 'number&string&bool',
    },
    run: (payload, param) => {
        if (param.type == 'number') param.value = parseFloat(param.value);
        if (param.type == 'bool') param.value = param.value === 'true';
        payload[param.key] = param.value;
        return payload;
    },
};

const If = {
    name: 'If',
    param: {
        field: '*string',
        operator: '>&<&=',
        value: '*string',
    },
    run: (payload, param) => {
        const op = param.operator;
        if (op === '>' && !(payload[param.field] > param.value))
            payload.END_RUN = true;
        if (op === '<' && !(payload[param.field] < param.value))
            payload.END_RUN = true;
        if (op === '=' && !(payload[param.field] == param.value))
            payload.END_RUN = true;
        return payload;
    },
};

module.exports = {
    name: 'Util',
    initialize,
    events: [],
    actions: [Print, Wait, Math, SetField, If],
};
