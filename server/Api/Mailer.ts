import { Application, Request, Response  } from 'express';
import Constants from '../Constants';
const nodemailer = require("nodemailer");


export class Mailer {
    constructor(app: Application) {
        
        app.post(Constants.apiUrls.sendMail, (req: Request, res:Response) => {
            console.log("request came");
            let user = req.body;
            sendMail(user, (info: any) => {
              console.log(`The mail has been sent successfully`);
              res.send(info);
            });
        });
       
        async function sendMail(user: { userEmail: any; userName: any; message: any; }, callback: { (info: any): void; (arg0: any): void; }) {
            let transporter = nodemailer.createTransport({
                host: Constants.mailerConfig.host,
                port: Constants.mailerConfig.port,
                secure: true, 
                auth: {
                  user: Constants.mailerConfig.EMAIL_FROM,
                  pass: process.env.PASS
                }
            });
       
        let mailOptions = {
            from: user.userEmail, 
            to: Constants.mailerConfig.EMAIL_FROM, 
            subject: "New comment from Medeor client",
            html: `<p>My name is ${user.userName}.</p>
            <p>${user.message}. You can contact me at my email ${user.userEmail}.</p>`
        };
       
        let info = await transporter.sendMail(mailOptions);
          callback(info);
        }
       
    }
}