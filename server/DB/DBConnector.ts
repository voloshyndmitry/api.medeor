import data from './data'

interface IDBConnector {
    getUrlDataById: (id: string) => IUrlData | null
}
interface IUrlData {
    id: string;
    title: string;
    description: string;
    url: string
}
export class DBConnector {
    private readonly autData
    private readonly users
    private readonly clients

    constructor() {
        this.autData = data.autData
        this.users = data.users
        this.clients = data.clients
    }

    public getUserId(login: string, pass: string) {
        const user = this.autData.find((user: { login: string, pass: string }) => user.login === login && user.pass === pass);
        return user?.id
    }

    public getUserDataById(id: string) {
        return this.users.find((user: { id: string }) => user.id === id)
    }

    public getClientsByDoctorId(id: string) {
        return this.clients.filter((user: { doctorID: string }) => user.doctorID === id)
    }
}