import { Client } from './../../Interfaces/Clients';
import Mongo from '../mongoConnect';

const { client } = Mongo;

const getAllClients = async (): Promise<Client[]> => {
    const { clients } = await client.db("medeordb").collection("clients")
        .findOne()
    return clients
}

const getClientsByDoctorId = async (id: string): Promise<Client[]> => {
    const clients: Client[] = await getAllClients();
    return clients.filter?.((user: Client) => user.doctorID === String(id))
}

const updateClient = async (updatedClient: Client, doctorID: string): Promise<Client[]> => {
    const clients: Client[] = await getAllClients();
    const data: Client[] = clients?.map?.((client: Client) => client.id === updatedClient.id ? { ...client, ...updatedClient } : client)
    await client.db("medeordb").collection("clients")
        .updateOne({}, { $set: { clients: data } });
    return data;
}

const addClient = async (data: Client): Promise<Client> => {
    const clients: Client[] = await getAllClients();
    await client.db("medeordb").collection("clients")
        .updateOne({}, { $set: { clients: [...clients, data] } });
    return data;
}

const deleteClientById = async (id: string, doctorID: string): Promise<Client[]> => {
    const clients: Client[] = await getAllClients();
    const data: Client[] = clients?.filter?.((data: Client) => data.id !== id && data.doctorID === doctorID)
    await client.db("medeordb").collection("clients")
        .updateOne({}, { $set: { clients: data } });
    return data;
}

const getClientById = async (id: string, doctorID: string): Promise<Client> => {
    const { clients: result } = await client.db("medeordb").collection("clients")
        .findOne()
    return result?.find?.((user: Client) => user.id === id && user.doctorID === doctorID)
}

export {
    getClientById,
    getClientsByDoctorId,
    updateClient,
    addClient,
    deleteClientById
}