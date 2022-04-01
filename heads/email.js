var nodemailer = require('nodemailer');

let transporter;

const initialize = () => {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
};

const send_email = (to, contents, subject) => {
    var mail_options = {
        from: 'elibotman@gmail.com',
        to,
        subject,
        text: contents,
    };

    transporter.sendMail(mail_options, (error, _info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`[EMAIL]: Sent ${subject}`);
        }
    });
};

const Send = {
    name: 'Send',
    param: {
        to: '*string',
        '?contents': '*string',
        '?field': '*string',
        '?subject': '*string',
    },
    run: (payload, param) => {
        let subject = `Aria Message ${new Date().toISOString()}`;
        if (param.subject !== undefined) {
            subject = param.subject;
        }

        let contents = '';
        if (param.contents !== undefined) {
            contents = param.contents;
        }
        if (param.field !== undefined) {
            contents = payload[param.field];
        }

        send_email(param.to, contents, param.subject);

        return payload;
    },
};

module.exports = {
    name: 'Email',
    initialize,
    events: [],
    actions: [Send],
};
