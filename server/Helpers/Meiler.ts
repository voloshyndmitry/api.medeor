import nodemailer, { SentMessageInfo } from 'nodemailer';
import Constants from '../Constants';

export interface IMailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}

export interface IMailerCallBack { (info: SentMessageInfo): void;(arg0: string): void; }

export const transporter = nodemailer.createTransport({
    host: Constants.mailerConfig.host,
    port: Constants.mailerConfig.port,
    secure: true,
    auth: {
        user: Constants.mailerConfig.EMAIL_FROM,
        pass: process.env.PASS
    }
});

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

export const newComment = (user: { userEmail: any; userName: any; message: any; }) => ({
    from: user.userEmail,
    to: Constants.mailerConfig.EMAIL_FROM,
    subject: "New comment from Medeor client",
    html: `<p>My name is ${user.userName}.</p>
    <p>${user.message}. You can contact me at my email ${user.userEmail}.</p>`
})

export const sendMail = async (mailOptions: IMailOptions, callback?: IMailerCallBack): Promise<SentMessageInfo> => {
    try {
        const info = await transporter.sendMail(mailOptions);
        callback?.(info);
        return info;
    }
    catch (error) {
        return { error }
    }
}
