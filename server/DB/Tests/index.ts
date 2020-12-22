import { ITestsGroup } from './../../Interfaces/Tests';
import Mongo from '../mongoConnect';

const { client } = Mongo;
const dbName = 'medeordb';
const collection = 'testsGroup';

const getAllTests = async (): Promise<ITestsGroup[]> => {
    const { data } = await client.db(dbName).collection(collection)
        .findOne()
    return data
}

const getTestsByDoctorId = async (id: string): Promise<ITestsGroup[]> => {
    const tests: ITestsGroup[] = await getAllTests();
    return tests.filter?.((test: ITestsGroup) => test.doctorId === String(id))
}

const updateTest = async (updatedTest: ITestsGroup, doctorId: string): Promise<ITestsGroup[]> => {
    const tests: ITestsGroup[] = await getAllTests();
    const data: ITestsGroup[] = tests?.map?.((test: ITestsGroup) => test.id === updatedTest.id ? { ...test, ...updatedTest } : client)
    await client.db(dbName).collection(collection)
        .updateOne({}, { $set: { data } });
    return data.filter(test => test.doctorId === doctorId);
}

const addTest = async (data: ITestsGroup): Promise<ITestsGroup> => {
    const tests: ITestsGroup[] = await getAllTests();
    await client.db(dbName).collection(collection)
        .updateOne({}, { $set: { data: [...tests, data] } });
    return data;
}

const deleteTestById = async (id: string, doctorId: string): Promise<ITestsGroup[]> => {
    const tests: ITestsGroup[] = await getAllTests();
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
    getTestById,
    getTestsByDoctorId,
    updateTest,
    addTest,
    deleteTestById
}