import Constants from '../Constants';
import { Application, Response } from 'express';
import { AuthorizeService as AuthorizeService } from '../Services/AuthorizeService';
import { AuthRequest } from '../Interfaces/AutorizationInterface';
import { getTestsGroupByClientId } from '../DB/Tests/TestsConnector';
import { ITest, ITestsGroup } from '../Interfaces/TestsInterface';
import { getAllTestTemplates } from '../DB/Templates/TestsTemplateConnector';
import { getAllGroupTemplates } from '../DB/Templates/TestsGroupTemplateConnector';


export class TestController {
    private readonly app: Application;
    private autService: AuthorizeService = new AuthorizeService
    private defaultError: { error: string } = { error: "Can`t find the testGroup." }
    constructor(app: Application) {
        this.app = app
        this.setRequestHandlers()
    }

    private setRequestHandlers() {
        const { apiUrls: { tests, testsGroups, testsTemplates, testsGroupsTemplates } } = Constants;
        // this.app.get(tests, this.getTestsGroupByClientId)
        this.app.get(testsGroups, this.getTestsGroupByClientId)
        this.app.get(testsTemplates, this.getAllTestTemplates)
        this.app.get(testsGroupsTemplates, this.getTestsGroupTemplates)
        // this.app.put(testsGroups, this.getTestsGroupByClientId)
        // this.app.post(testsGroups, this.getTestsGroupByClientId)
        // this.app.delete(testsGroups, this.getTestsGroupByClientId)
    }

    private getTestsGroupByClientId = async (req: AuthRequest, res: Response) => {
        const { query: { clientId = '', date = '' }, userId = '1606760413563' } = req;

        const testsGroups: ITestsGroup[] = await getTestsGroupByClientId(String(userId), String(clientId), String(date))
        return res.json(testsGroups?.length ? { data: testsGroups } : this.defaultError)

    }

    private getAllTestTemplates = async (req: AuthRequest, res: Response) => {

        const testsTemplates: ITest[] = await getAllTestTemplates()
        return res.json(testsTemplates?.length ? { data: testsTemplates } : this.defaultError)

    }

    private getTestsGroupTemplates = async (req: AuthRequest, res: Response) => {

        const testsGroupTemplates: ITestsGroup[] = await getAllGroupTemplates()
        return res.json(testsGroupTemplates?.length ? { data: testsGroupTemplates } : this.defaultError)

    }

    private generateTestId = (): string => new Date().getTime().toString();

}
