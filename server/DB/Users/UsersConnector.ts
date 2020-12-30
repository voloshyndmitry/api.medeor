import { User } from '../../Interfaces/UsersInterface';
import Mongo from '../mongoConnect';

const { client } = Mongo;
const dbName = 'medeordb';
const clientsCollection = "clients";
const autDataCollection = "autData";
const usersCollection = "users";


const printUsers = async () => {
    const result = await client.db(dbName).collection(clientsCollection)
        .find().toArray()

    if (result) {
        console.log('result:');
        result.map((client: any) => console.log(client));
    }
}


const getUserDataById = async (id: string) => {
    const { data: result } = await getAllUsers()
    return result.find((user: { id: string }) => user.id === id)
}

const getAllAuthData = async () => {
    return client.db(dbName).collection(autDataCollection)
        .findOne()
}

const addUser = async (user: User) => {
    const { data: userIds } = await client.db(dbName).collection(autDataCollection)
        .findOne()
    const { data } = await getAllUsers();
    await client.db(dbName).collection(autDataCollection)
        .updateOne({}, { $set: { data: [...userIds, { login: user.email, pass: user.pass, id: user.id }] } });
    await client.db(dbName).collection(usersCollection)
        .updateOne({}, { $set: { data: [...data, user] } });
    return user
}

const deleteUserById = async (id: string) => {
    const { data: result } = await getAllUsers();
    const usersFilter = (user: { id: string }) => user.id !== id
    const users = result.filter(usersFilter);
    await client.db(dbName).collection(usersCollection)
        .updateOne({}, { $set: { data: users } });

    const { data: autData } = await getAllAuthData();
    const filtereAutData = autData.filter(usersFilter)
    await client.db(dbName).collection(autDataCollection)
        .updateOne({}, { $set: { data: filtereAutData } });

    return users
}


const getAllUsers = async () => {
    return client.db(dbName).collection(usersCollection)
        .findOne()
}

const updateUser = async (user: User) => {
    const { data } = await getAllUsers();
    const updatedUsers = data.map((item: User) => {
        if (item.id === user.id) {
            return { ...item, ...user }
        }
        return user
    })

    await client.db(dbName).collection(usersCollection)
        .updateOne({}, { $set: { data: updatedUsers } });
    return user
}

export {
    getAllAuthData,
    getUserDataById,
    addUser,
    updateUser,
    deleteUserById
}
