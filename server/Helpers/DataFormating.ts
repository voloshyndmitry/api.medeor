import { ITestsGroup } from './../Interfaces/TestsInterface';
import { ITest } from "../Interfaces/TestsInterface";

export const testTemplateFormatting = (data: any): ITest => {
    const {
        typeId,
        code,
        refValue = {},
        title = {},
        description = {},
        unit = {}
    } = data;

    return {
        typeId: `${code}${new Date().getTime().toString()}`,
        id: '',
        code,
        value: '',
        refValue,
        title,
        description,
        unit
    }

}
export const testGroupTemplateFormatting = (data: any): ITestsGroup => {
    const {
        name,
        description,
        tests
    } = data;

    return {
        typeId: new Date().getTime().toString(),
        id: '',
        date: '',
        clientId: '',
        doctorId: '',
        name,
        description,
        tests: tests.map(({ typeId }: ITest) => ({ typeId })).filter((test: ITest) => test)
    }

}