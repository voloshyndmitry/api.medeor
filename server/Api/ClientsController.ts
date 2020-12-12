import { Application, Request, Response } from 'express';
import Constants from '../Constants';
import MongoDb from '../DB/mongoConnect';
import { AutorizeService } from '../Services/AutorizeService';

export class ClientsController {
    private readonly app: Application;
    private constants = Constants
    private autService: AutorizeService = new AutorizeService
    private dbConnector = MongoDb
    private defaultError: { error: string } = { error: "Can`t find the client(s)." }

    constructor(app: Application) {
        this.app = app
        this.setRequestHandlers()
    }

    private setRequestHandlers() {
        const { apiUrls: { getClients, getClient } } = this.constants;
        this.app.get(getClients, this.autService.authenticateToken, this.getClients)
        this.app.get(getClient, this.autService.authenticateToken, this.getClient)
    }

    private getClients = async (req: Request, res: Response) => {
        // if (!this.autService.checkAutorize(req, res)) { return null }
        const { query: { id } } = req;
        const clients: any[] = await this.dbConnector.getClientsByDoctorId(String(id))
        const response = clients?.length ? { clients } : this.defaultError;
        res.json(response)
    }

    private getClient = async (req: Request, res: Response) => {
        // if (!this.autService.checkAutorize(req, res)) { return null }
        const { query: { id } } = req;
        const client: any = await this.dbConnector.getClientById(String(id))
        const response = client || this.defaultError;
        res.json(response)
    }
}