import { Application, Request, Response } from 'express';
import Constants from '../Constants';
import { IMailerCallBack, newComment, transporter } from '../Helpers/Meiler';

interface IUser {
  userEmail: string; userName: string; message: string;
}
export class Mailer {
  constructor(app: Application) {

    app.post(Constants.apiUrls.sendMail, (req: Request, res: Response) => {
      const user = req.body;

      sendMail(user, (info: string) => {
        console.log(`The mail has been sent successfully`);
        res.send(info);
      });
    });

    async function sendMail(user: IUser, callback: IMailerCallBack) {
      const info = await transporter.sendMail(newComment(user));
      callback(info);
    }
  }
}