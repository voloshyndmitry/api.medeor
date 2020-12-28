import Constants from '../Constants';
import { Application, Response } from 'express';
import { AuthorizeService as AuthorizeService } from '../Services/AuthorizeService';
import { AuthRequest } from '../Interfaces/AutorizationInterface';
import { getTestsGroupByClientId } from '../DB/Tests/TestsConnector';
import { ITestsGroup } from '../Interfaces/TestsInterface';


export class TestController {
    private readonly app: Application;
    private autService: AuthorizeService = new AuthorizeService
    private defaultError: { error: string } = { error: "Can`t find the testGroup." }
    constructor(app: Application) {
        this.app = app
        this.setRequestHandlers()
    }

    private setRequestHandlers() {
        const { apiUrls: { tests, testsGroups } } = Constants;
        this.app.get(testsGroups, this.getTestsGroupByClientId)
        // this.app.put(testsGroups, this.getTestsGroupByClientId)
        // this.app.post(testsGroups, this.getTestsGroupByClientId)
        // this.app.delete(testsGroups, this.getTestsGroupByClientId)
    }

    private getTestsGroupByClientId = async (req: AuthRequest, res: Response) => {
        const { query: { clientId = '', date = '' }, userId = '1606760413563' } = req;

        const testsGroups: ITestsGroup[] = await getTestsGroupByClientId(String(userId), String(clientId), String(date))
        return res.json(testsGroups?.length ? { data: testsGroups } : this.defaultError)

    }

    private generateTestId = (): string => new Date().getTime().toString();

}
