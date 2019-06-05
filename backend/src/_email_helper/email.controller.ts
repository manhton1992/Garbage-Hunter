/**
 * Email controller
 */

import { Request, Response } from 'express';
import { IUserModel, user } from '../models/user.model';
import * as jwt from "jsonwebtoken";
const mailConfig = require('../_email_helper/email-config');
const hbs = require('nodemailer-express-handlebars');
const gmailTransport = mailConfig.GmailTransport;

//env
require('dotenv').config();
let environment = process.env;

// secret key use to create token
const myJWTSecretKey = environment.JWT_SECRET_KEY;



// emailTo: string, url: string, token: string
export const sendMailRegister = async (user: IUserModel) => {
  try {
    let urlConfirmEmail = environment.URL_CONFIRM_EMAIL;

    if (user && myJWTSecretKey && urlConfirmEmail){
     
     const token = jwt.sign(user.toJSON(), myJWTSecretKey);
  
     mailConfig.ViewOption(gmailTransport,hbs);
     let HelperOptions = {
       from: '"Garbage Hunter Team" <garbage.hunter.2019@gmail.com>',
       to: user.email,
       subject: 'Register Confirm',
       template: 'register-email',
       context: {
         email: user.email,
         token: token,
         url: urlConfirmEmail,
       }
       };
   
       gmailTransport.sendMail(HelperOptions, (error: any,info: any) => {
           if(error) {
             console.log(error);
           }
           console.log("email is send");
           console.log(info);
       });
   
    }
  } catch (error) {
    console.log(error)
  }
 

}