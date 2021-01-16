import { testGroupValidation } from './../Helpers/Validation';
import Constants from '../Constants';
import { Application, Response } from 'express';
import { AuthorizeService as AuthorizeService } from '../Services/AuthorizeService';
import { AuthRequest } from '../Interfaces/AutorizationInterface';
import { addTest, getTestsGroupByClientId } from '../DB/Tests/TestsConnector';
import { ITest, ITestsGroup } from '../Interfaces/TestsInterface';
import { addTestTemplate, deleteTestTemplate, getAllTestTemplates } from '../DB/Templates/TestsTemplateConnector';
import { addTestGroupTemplate, getAllGroupTemplates } from '../DB/Templates/TestsGroupTemplateConnector';
import { testGroupTemplateFormatting, testTemplateFormatting } from '../Helpers/DataFormating';


export class TestController {
    private readonly app: Application;
    private autService: AuthorizeService = new AuthorizeService
    private defaultError: { error: string } = { error: "Can`t find the testGroup." }
    constructor(app: Application) {
        this.app = app
        this.setRequestHandlers()
    }

    private setRequestHandlers() {
        const { apiUrls: { tests, testsGroups, testTemplates, testGroupTemplates } } = Constants;
        // this.app.get(tests, this.getTestsGroupByClientId)
        this.app.get(testsGroups, this.getTestsGroupByClientId)
        this.app.get(testTemplates, this.getAllTestTemplates)
        this.app.post(testTemplates, this.addTestTemplate)
        this.app.delete(testTemplates, this.deleteTestTemplate)
        this.app.get(testGroupTemplates, this.getTestGroupTemplates)
        this.app.post(testGroupTemplates, this.addTestGroupTemplates)
        // this.app.put(testsGroups, this.getTestsGroupByClientId)
        this.app.post(testsGroups, this.createTestGroup)
        // this.app.delete(testsGroups, this.getTestsGroupByClientId)
    }

    private getTestsGroupByClientId = async (req: AuthRequest, res: Response) => {
        const { query: { clientId = '', date = '' }, userId = '1606760413563' } = req;

        const testsGroups: ITestsGroup[] = await getTestsGroupByClientId(String(userId), String(clientId), String(date))
        return res.json(testsGroups?.length ? { data: testsGroups } : this.defaultError)
    }

    private getAllTestTemplates = async (req: AuthRequest, res: Response) => {

        const testTemplates: ITest[] = await getAllTestTemplates()
        return res.json(testTemplates?.length ? { data: testTemplates } : this.defaultError)
    }

    private addTestTemplate = async (req: AuthRequest, res: Response) => {
        const { body } = req;
        const testTemplate: ITest = testTemplateFormatting(body);
        const testTemplates: ITest[] = await addTestTemplate(testTemplate)
        return res.json(testTemplates?.length ? { data: testTemplates } : this.defaultError)
    }

    private deleteTestTemplate = async (req: AuthRequest, res: Response) => {
        const { query: { typeId = '' } } = req;

        const testTemplates: ITest[] = await deleteTestTemplate(String(typeId))
        return res.json(testTemplates?.length ? { data: testTemplates } : this.defaultError)
    }

    private getTestGroupTemplates = async (req: AuthRequest, res: Response) => {

        const testsGroupTemplates: ITestsGroup[] = await getAllGroupTemplates()
        return res.json(testsGroupTemplates?.length ? { data: testsGroupTemplates } : this.defaultError)
    }

    private addTestGroupTemplates = async (req: AuthRequest, res: Response) => {
        const { body } = req;
        const testGroupTemplate: ITestsGroup = testGroupTemplateFormatting(body)
        const testGroupTemplates: ITestsGroup[] = await addTestGroupTemplate(testGroupTemplate)
        return testGroupTemplates
    }

    private createTestGroup = async (req: AuthRequest, res: Response) => {
        const { body } = req;
        const test = testGroupValidation(body);
        if (test.error) {
            return res.json(test)
        }
        return await addTest(test as ITestsGroup);
    }
}
