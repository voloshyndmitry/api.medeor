import { ITest } from './../../Interfaces/TestsInterface';
import { ITestsGroup } from '../../Interfaces/TestsInterface';
import Mongo from '../mongoConnect';
import { getAllGroupTemplates } from '../Templates/TestsGroupTemplateConnector';
import { getAllTestTemplates } from '../Templates/TestsTemplateConnector';

const { client } = Mongo;
const dbName = 'medeordb';
const collection = 'testsGroup';

const getAllTestGroups = async (): Promise<ITestsGroup[]> => {
    const { data } = await client.db(dbName).collection(collection)
        .findOne()
    return data
}

const getTemplateByTypeId = (templates: any[], typeId: string) => {
    return templates?.find?.((template: ITestsGroup | ITest) => template.typeId === typeId)
}

const getTestsByDoctorId = async (id: string, date?: string): Promise<ITestsGroup[]> => {
    const tests: ITestsGroup[] = await getAllTestGroups();
    const groupTemplates: ITestsGroup[] = await getAllGroupTemplates();
    const testTemplates: ITest[] = await getAllTestTemplates();
    const selectedTests: ITestsGroup[] = tests.filter?.((test: ITestsGroup) => test.doctorId === String(id))
    const updatedTests: ITestsGroup[] = selectedTests.map((test: ITestsGroup) => {
        const template: ITestsGroup = getTemplateByTypeId(groupTemplates, test.typeId) || test;
        return {
            ...template,
            ...test,
            tests: test?.tests?.map?.((test: ITest) => {
                const testTemplate: ITest = getTemplateByTypeId(testTemplates, test?.typeId)
                return { ...testTemplate, ...test }
            }) || []
        }
    })
    return updatedTests
}

const getTestsGroupByClientId = async (doctorId: string, clientId: string, date: string): Promise<ITestsGroup[]> => {
    const tests: ITestsGroup[] = await getTestsByDoctorId(doctorId, date)
    if (clientId) {
        return tests.filter((test) => test.clientId === clientId)
    }
    return tests
}

const updateTest = async (updatedTest: ITestsGroup, doctorId: string): Promise<ITestsGroup[]> => {
    const tests: ITestsGroup[] = await getAllTestGroups();
    const data: ITestsGroup[] = tests?.map?.((test: ITestsGroup) => test.id === updatedTest.id ? { ...test, ...updatedTest } : client)
    await client.db(dbName).collection(collection)
        .updateOne({}, { $set: { data } });
    return data.filter(test => test.doctorId === doctorId);
}

const addTest = async (data: ITestsGroup): Promise<ITestsGroup> => {
    const tests: ITestsGroup[] = await getAllTestGroups();
    await client.db(dbName).collection(collection)
        .updateOne({}, { $set: { data: [...tests, data] } });
    return data;
}

const deleteTestById = async (id: string, doctorId: string): Promise<ITestsGroup[]> => {
    const tests: ITestsGroup[] = await getAllTestGroups();
    const data: ITestsGroup[] = tests?.filter?.((data: ITestsGroup) => data.id !== id && data.doctorId === doctorId)
    await client.db(dbName).collection(collection)
        .updateOne({}, { $set: { data } });
    return data;
}

const getTestById = async (id: string, doctorId: string): Promise<ITestsGroup> => {
    const { data } = await client.db(dbName).collection(collection)
        .findOne()
    return data?.find?.((test: ITestsGroup) => test.id === id && test.doctorId === doctorId)
}

export {
    getAllTestGroups,
    getTestsByDoctorId,
    getTestsGroupByClientId,
    updateTest,
    addTest,
    deleteTestById
}