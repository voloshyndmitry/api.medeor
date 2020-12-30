import { ITest } from '../../Interfaces/TestsInterface';
import Mongo from '../mongoConnect';

const { client } = Mongo;
const dbName = 'medeordb';
const collection = 'testsTemplate';

const getAllTestTemplates = async (): Promise<ITest[]> => {
    const { data } = await client.db(dbName).collection(collection)
        .findOne()
    return data
}

const addTestTemplate = async (template: ITest): Promise<ITest[]> => {
    const data = await getAllTestTemplates();
    const newTests = [...data, template]
    await client.db(dbName).collection(collection)
        .updateOne({}, { $set: { data: newTests } });

    return newTests
}

const updateTestTemplate = async (template: ITest): Promise<ITest[]> => {
    const data: ITest[] = await getAllTestTemplates();
    const newTests: ITest[] = data.map((test: ITest) => test.typeId === template.typeId ? { ...test, ...template } : test);
    await client.db(dbName).collection(collection)
        .updateOne({}, { $set: { data: newTests } });

    return newTests
}

const deleteTestTemplate = async (typeId: string): Promise<ITest[]> => {
    const data: ITest[] = await getAllTestTemplates();
    const newTests = data.filter((test: ITest) => test.typeId !== typeId);
    await client.db(dbName).collection(collection)
        .updateOne({}, { $set: { data: newTests } });

    return newTests
}

export {
    getAllTestTemplates,
    addTestTemplate,
    updateTestTemplate,
    deleteTestTemplate
}
