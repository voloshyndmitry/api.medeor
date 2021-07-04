import Mongo from '../mongoConnect';

const { client } = Mongo;
const dbName = 'medeordb';
const collection = 'config';

export const getMailerApiKey = async (): Promise<string> => {
    const SEND_GRID_API_KEY = await client.db(dbName).collection(collection)
        .findOne()
    return SEND_GRID_API_KEY
}