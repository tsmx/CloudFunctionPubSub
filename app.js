const nodemailer = require('nodemailer');
const config = require('./config');

module.exports.sendMail = function(event, context) {
    const data = JSON.parse(Buffer.from(event.data, 'base64').toString());
    let transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: true, // true for 465, false for other ports
        auth: {
            user: config.user,
            pass: config.pass
        }
    });
    transporter.sendMail({
        from: config.mailFrom,
        to: config.mailTo, 
        subject: data.subject,
        text: 'Dear ' + data.user + ', \r\nthank you for using cloud functions :-)',
    }).then(() => { console.log('email sent, payload was: ' + JSON.stringify(data)); });
};