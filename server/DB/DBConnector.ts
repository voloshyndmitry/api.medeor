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
export class DBConnector implements IDBConnector {
    private readonly dataUrls: IUrlData[]
    constructor() {
        this.dataUrls = data.urls
    }
    /**
     * getUrlDataById
     */
    public getUrlDataById(id: string) {
        return this.dataUrls.find(({id:urlId})=> id === urlId ) || null
    }
}