export interface ITest {
    typeId: string,
    id?: string,
    code: string,
    value?: string,
    refValue: IRefValue,
    title: ITranslation,
    description?: ITranslation,
    unit: ITranslation,
}

interface IRefValue {
    max: string,
    min: string,
    specialRefs: { [name: string]: IRefValue }
}

export interface ITranslation {
    ru?: string,
    en?: string,
    ua?: string,
}

export interface ITestsGroup {
    typeId: string,
    id: string,
    date: string,
    clientId?: string,
    doctorId?: string,
    name: ITranslation,
    description?: ITranslation,
    tests: ITest[]
}

//Example data
// var data = {
//     "data": [
//         {
//             "id": "123",
//             "date": "string",
//             "clientId": "12345678",
//             "doctorId": "1606760413563",
//             "name": {
//                 "ru": "Группа А",
//                 "en": "A Group",
//                 "ua": "Группа А",
//             },
//             "description": {
//                 "ru": "Описание",
//                 "en": "Description",
//                 "ua": "Пояснення",
//             },
//             "tests": [
//                 {
//                     "id": "1234",
//                     "code": "TEST",
//                     "value": "13",
//                     "refValue": {
//                         "min": "12",
//                         "max": "15"
//                     },
//                     "title": {
//                         "ru": "Витамин А",
//                         "en": "Vitamin A",
//                         "ua": "Витамин А",
//                     },
//                     "description": {
//                         "ru": "описание теста",
//                         "en": "test description",
//                         "ua": "пояснення тесту",
//                     },
//                     "unit": {
//                         "ru": "г",
//                         "en": "gm",
//                         "ua": "г",
//                     },
//                 }
//             ]
//         }
//     ]
// }