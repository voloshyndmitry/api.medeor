import { ITest } from './../Interfaces/TestsInterface';
import { Client } from "../Interfaces/ClientsInterface";
import { User } from "../Interfaces/UsersInterface";
import isEmail from 'validator/lib/isEmail';
import isPhone from 'validator/lib/isMobilePhone';
import { ITestsGroup } from "../Interfaces/TestsInterface";


enum ErrorType {
    REQUIRED = 'required',
    VALIDATION = 'validation'
}

enum EMessage {
    NAME = 'name',
    SUR_NAME = 'surName',
    EMAIL = 'email',
    SEX = 'sex',
    BIRTHDAY = 'birthday',
    PHONE = 'phone',
    PASS = 'pass',
    ID = 'id',
    TYPE_ID = 'typeId',
    CLIENT_ID = 'clientId',
    DOCTOR_ID = 'doctorId',
    TESTS = 'tests',
    DATE = 'date',
    VALUE = 'value'
}

const errorMessage: any = {
    required: {
        name: 'Name is required',
        surName: 'Surname is required',
        email: 'Email is required',
        sex: 'Sex is required',
        birthday: 'birthday is required',
        phone: 'Phone is required',
        pass: 'Pass is required',
        id: 'Id is required',
        typeId: 'TypeId is required',
        clientId: 'ClientId is required',
        doctorId: 'DoctorId is required',
        tests: 'Tests is required',
        date: 'Date is required',
        value: 'Value is required'
    },
    validation: {
        phone: 'Phone number is not valid',
        email: 'Email is not valid',
        tests: 'Test is not valid'
    }
}

export interface IErrorMessage {
    error: string
}

const getError = (type: ErrorType, message: EMessage): IErrorMessage => {
    return { error: errorMessage?.[type]?.[message] || `Validation error: ${message}` }
}

export const testGroupValidation = (props: ITestsGroup): ITestsGroup | IErrorMessage => {
    const { id, typeId, clientId, doctorId, tests, date } = props;

    if (!id) { return getError(ErrorType.REQUIRED, EMessage.ID) }
    if (!typeId) { return getError(ErrorType.REQUIRED, EMessage.TYPE_ID) }
    if (!clientId) { return getError(ErrorType.REQUIRED, EMessage.CLIENT_ID) }
    if (!doctorId) { return getError(ErrorType.REQUIRED, EMessage.DOCTOR_ID) }
    if (!date) { return getError(ErrorType.REQUIRED, EMessage.DATE) }
    if (!tests || !tests?.length) {
        return getError(ErrorType.REQUIRED, EMessage.TESTS)
    }
    if (tests.some(testValidation)) {
        return getError(ErrorType.VALIDATION, EMessage.TESTS)
    }
    return {
        id,
        typeId,
        clientId,
        doctorId,
        tests: tests.map(updateTest),
        date
    };
}

const testValidation = (props: ITest): boolean | IErrorMessage => {
    const { typeId, value } = props;
    if (!typeId) { return getError(ErrorType.REQUIRED, EMessage.TYPE_ID) }
    if (!value) { return getError(ErrorType.REQUIRED, EMessage.VALUE) }

    return false
}

const updateTest = (test: ITest) => {
    return { ...test, id: String(new Date().getTime()) }
}

export const clientValidation = (client: any): Client | IErrorMessage => {
    const {
        id,
        doctorId,
        name,
        surname,
        sex,
        birthday,
        pregnancy = '',
        phone,
        email,
        photo = '',
        tags = []
    } = client;

    if (!name) { return getError(ErrorType.REQUIRED, EMessage.NAME) }
    if (!surname) { return getError(ErrorType.REQUIRED, EMessage.SUR_NAME) }
    if (!sex) { return getError(ErrorType.REQUIRED, EMessage.SEX) }
    if (!birthday) { return getError(ErrorType.REQUIRED, EMessage.BIRTHDAY) }
    if (!phone) { return getError(ErrorType.REQUIRED, EMessage.PHONE) }
    if (!email) { return getError(ErrorType.REQUIRED, EMessage.EMAIL) }
    if (!isPhone(phone)) { return getError(ErrorType.VALIDATION, EMessage.PHONE) }
    if (!isEmail(email)) { return getError(ErrorType.VALIDATION, EMessage.EMAIL) }

    return {
        id,
        doctorId,
        name,
        surname,
        sex,
        birthday,
        pregnancy,
        phone,
        email,
        photo,
        tags
    }
}

export const userValidation = (user: User) => {
    const {
        id,
        name,
        surname,
        phone = '',
        location = '',
        specialties = '',
        email,
        pass,
    } = user;

    if (!name) { return getError(ErrorType.REQUIRED, EMessage.NAME) }
    if (!surname) { return getError(ErrorType.REQUIRED, EMessage.SUR_NAME) }
    if (!email) { return getError(ErrorType.REQUIRED, EMessage.EMAIL) }
    if (!phone) { return getError(ErrorType.VALIDATION, EMessage.PHONE) }
    // if (phone && !isPhone(phone)) { return getError(ErrorType.VALIDATION, EMessage.PHONE) }
    if (!isEmail(email)) { return getError(ErrorType.VALIDATION, EMessage.EMAIL) }

    return {
        id,
        name,
        surname,
        phone,
        location,
        specialties,
        email,
        pass,
    }
}

export const editUserValidation = (user: User) => {
    const {
        id,
        email,
    } = user;

    if (!id) { return getError(ErrorType.REQUIRED, EMessage.ID) }
    // if (phone && !isPhone(phone)) { return getError(ErrorType.VALIDATION, EMessage.PHONE) }
    if (email && !isEmail(email)) { return getError(ErrorType.VALIDATION, EMessage.EMAIL) }

    return user
}