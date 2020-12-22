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
}

export interface ITranslation {
    ru?: string,
    en?: string,
    ua?: string,
}