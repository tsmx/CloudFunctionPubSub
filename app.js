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
        from: '"Doc-Base.com" <noreply@doc-base.com>', // sender address
        to: 'Sebastian Stricker, strs@freenet.de', // list of receivers
        subject: data.subject, // Subject line
        text: 'Dear ' + data.user + ', \r\nthank you for registering', // plain text body
    }).then(() => { console.log('email sent, payload was: ' + JSON.stringify(data)); });
};