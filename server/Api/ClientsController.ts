import { AuthRequest } from './../Interfaces/Autorization';
import { Application, Request, Response } from 'express';
import Constants from '../Constants';
import { addClient, deleteClientById, getClientById, getClientsByDoctorId, updateClient } from '../DB/Clients';
import MongoDb from '../DB/mongoConnect';
import { AutorizeService } from '../Services/AutorizeService';
import { Client } from '../Interfaces/Clients';

export class ClientsController {
    private readonly app: Application;
    private constants = Constants
    private autService: AutorizeService = new AutorizeService
    private defaultError: { error: string } = { error: "Can`t find the client(s)." }

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
        const clients: Client[] = await getClientsByDoctorId(userId)
        if (clients?.length) {
            return res.json({ clients })
        }
        return res.status(400).json(this.defaultError)
    }

    private getClient = async (req: AuthRequest, res: Response) => {
        const { query: { id }, userId = '' } = req;

        const client: any = await getClientById(String(id), userId)
        const response = client || this.defaultError;
        res.json(response)
    }

    private validateClient(data: any): Client {
        //TODO: add validation
        return data
    }

    private updateClient = async (req: AuthRequest, res: Response) => {
        const { body, userId = '' } = req;
        const client: Client = this.validateClient({ ...body, doctorID: userId })
        const data: any = await updateClient(client, userId);
        if (data) {
            return res.json(data)
        }

        return res.status(500).json({ message: 'Some things went wrong' })
    }

    private addClient = async (req: AuthRequest, res: Response) => {
        const { body, userId = '' } = req;
        const newClient = { ...body, doctorID: userId, id: new Date().getTime().toString() }
        const client: Client = this.validateClient(newClient)
        const data: any = await addClient(client)
        if (data) {
            return res.json(data)
        }

        return res.status(500).json({ message: 'Some things went wrong' })
    }

    private deleteClient = async (req: AuthRequest, res: Response) => {
        const { body: { id }, userId = '' } = req;
        const data: any = await deleteClientById(String(id), userId)
        if (data) {
            return res.json(data)
        }

        return res.status(400).json(this.defaultError)

    }
}