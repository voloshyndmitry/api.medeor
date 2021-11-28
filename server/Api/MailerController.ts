import { Application, Request, Response } from 'express';
import Constants from '../Constants';
import { sendMail } from '../Helpers/Meiler';

interface IUser {
  userEmail: string; userName: string; message: string;
}
export class Mailer {
  constructor(app: Application) {

    app.post(Constants.apiUrls.sendMail, async (req: Request, res: Response) => {
      const user = req.body;
      try {
        const info = await sendMail(user);
        console.log(`The mail has been sent successfully`);
        res.send(info);

      } catch (error) {
        console.log('mail error: ', error)
        res.send(error)
      }
    });
  }
}