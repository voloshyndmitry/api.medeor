import nodemailer from 'nodemailer';
import Constants from '../Constants';

const sendgrid = require('nodemailer-sendgrid-transport');

export const transporter = nodemailer.createTransport(sendgrid({
    auth: { api_key: Constants.mailerConfig.SEND_GRID_API_KEY }
}));


export const regMail = (email: string) => {
    return {
        to: email,
        from: Constants.mailerConfig.EMAIL_FROM,
        subject: 'Account created',
        html: `
      <h1>Welcome!</h1>
      <p>Вы успешно создали аккаунт с email - ${email}</p>
      <hr/>
      <a href="${Constants.mailerConfig.BASE_URL}">Medeor</a>`
    };
}