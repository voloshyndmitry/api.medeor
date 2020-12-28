import { AuthRequest } from '../Interfaces/AutorizationInterface';
import { Application, Response } from 'express';
import Constants from '../Constants';
import { addClient, deleteClientById, getClientById, getClientsBydoctorId, updateClient } from '../DB/Clients/ClientConnector';
import { AuthorizeService } from '../Services/AuthorizeService';
import { Client } from '../Interfaces/ClientsInterface';
import { clientValidation } from '../Helpers/Validation';

export class ClientsController {
    private readonly app: Application;
    private constants = Constants
    private autService: AuthorizeService = new AuthorizeService
    private defaultError: { error: string } = { error: "Can`t find the client(s)." }
    private validationError: { error: string } = { error: 'Validation Error: name ,surname ,sex ,age ,phone ,email are required values' }

    constructor(app: Application) {
        this.app = app
        this.setRequestHandlers()
    }

    private setRequestHandlers() {
        const { apiUrls: { client, clients } } = this.constants;
        this.app.get(clients, this.autService.authenticateToken, this.getClients)
        this.app.get(client, this.autService.authenticateToken, this.getClient)
        this.app.post(client, this.autService.authenticateToken, this.addClient)
        this.app.put(client, this.autService.authenticateToken, this.updateClient)
        this.app.delete(client, this.autService.authenticateToken, this.deleteClient)
    }

    private getClients = async (req: AuthRequest, res: Response) => {
        const { userId = '' } = req;
        const clients: Client[] = await getClientsBydoctorId(userId)
        if (clients?.length) {
            return res.json({ clients })
        }
        return res.json(this.defaultError)
    }

    private getClient = async (req: AuthRequest, res: Response) => {
        const { query: { id }, userId = '' } = req;

        const client: any = await getClientById(String(id), userId)
        const response = client || this.defaultError;
        res.json(response)
    }

    private updateClient = async (req: AuthRequest, res: Response) => {
        const { body, userId = '' } = req;
        const client: any = { ...body, doctorId: userId }
        if (client.id) {
            const data = await updateClient(client as Client, userId);
            return res.json(data)
        }

        return res.json(this.defaultError)
    }

    private addClient = async (req: AuthRequest, res: Response) => {
        const { body, userId = '' } = req;
        const newClient = { ...body, doctorId: userId, id: new Date().getTime().toString() }
        const client: any = clientValidation(newClient)
        if (!client.error) {
            const data = await addClient(client as Client)
            return res.json(data)
        }

        return res.json(client || this.validationError)
    }

    private deleteClient = async (req: AuthRequest, res: Response) => {
        const { query: { id }, userId = '' } = req;
        const data: any = await deleteClientById(String(id), userId)
        if (data) {
            return res.json(data)
        }

        return res.json(this.defaultError)

    }
}
