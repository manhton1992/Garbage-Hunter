let nodemailer = require('nodemailer');
require('dotenv').config();
let environment = process.env;

module.exports.GmailTransport = nodemailer.createTransport({
    service: environment.GMAIL_SERVICE_NAME,
    host: environment.GMAIL_SERVICE_HOST,
    secure:environment.GMAIL_SERVICE_SECURE,
    port: environment.GMAIL_SERVICE_PORT,
    auth: {
        user: environment.GMAIL_USER_NAME,
        pass: environment.GMAIL_USER_PASSWORD
    }
});


module.exports.ViewOption = (transport: any, hbs: any) => {
    transport.use('compile', hbs({
        viewEngine: {
            extName: '.hbs',
            partialsDir: 'src/_email_helper/email_layout',
            layoutsDir: 'src/_email_helper/email_layout',
            defaultLayout: 'register-email.hbs',
          },
            viewPath: 'src/_email_helper/email_layout',
            extName: '.hbs'
    }));
}
