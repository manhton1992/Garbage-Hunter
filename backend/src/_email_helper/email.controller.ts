

import { Request, Response } from 'express';
const mailConfig = require('../_email_helper/email-config');
const hbs = require('nodemailer-express-handlebars');
const gmailTransport = mailConfig.GmailTransport;

export const sendMailRegister = async (req: Request, res: Response) => {
   mailConfig.ViewOption(gmailTransport,hbs);
  let HelperOptions = {
    from: '"Garbage Hunter Team" <garbage.hunter.2019@gmail.com>',
    to: emailTo,
    subject: 'Register Confirm',
    template: 'register-email',
    context: {
      name:lastName,
      email: emailTo,
      address: "52, Kadamtola Shubag dhaka"
    }
    };

    gmailTransport.sendMail(HelperOptions, (error: any,info: any) => {
        if(error) {
          console.log(error);
          res.json(error);
        }
        console.log("email is send");
        console.log(info);
        res.json(info)
    });

}