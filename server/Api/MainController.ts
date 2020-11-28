import { Application, Request, Response } from 'express';
import Constants from '../Constants';

export class MainController {
    private readonly app: Application;
    private constants = Constants

    constructor(app: Application) {
        this.app = app
        this.setRequestHandlers()
    }

    private setRequestHandlers() {
        const { apiUrls: { main } } = this.constants;
        this.app.get(main, this.getUrl)
    }

    private getUrl = (req: Request, res: Response) => {
        const defaultData = '<h1 style="text-align: center">Hello in MEDEOR!</h1>'
        res.send(defaultData)
    }
}