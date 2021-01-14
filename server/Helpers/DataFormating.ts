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