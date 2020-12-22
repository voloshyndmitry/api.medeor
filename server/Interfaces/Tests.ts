export interface ITest {
    id: string,
    code: string,
    value: string,
    refValue: IRefValue,
    title: ITranslation,
    unit: ITranslation,
}

interface IRefValue {
    max: string,
    min: string
    specialRefs: { [name: string]: IRefValue }
}

export interface ITranslation {
    ru?: string,
    en?: string,
    ua?: string,
}

export interface ITestsGroup {
    id: string,
    clientId: string,
    doctorId: string,
    name: ITranslation,
    description: ITranslation,
    tests: IRefValue[]
}
