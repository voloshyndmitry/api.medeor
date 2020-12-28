const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = process.env.DB_HOST;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const listDatabases = async () => {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach((db: any) => console.log(` - ${db.name}`));
};

const listCollections = async () => {
    const collections = await client.db(process.env.DB_NAME).listCollections().toArray();
    console.log('collections: ', collections);
};

const connect = async () => {
    try {
        await client.connect();
        console.log('DB connected');

    } catch (e) {
        console.error(e);
    }
}

const close = async () => {
    await client.close();
}

const getUserId = async (login: string, pass: string) => {
    const { data: result } = await client.db("medeordb").collection("autData")
        .findOne()
    const user = result.find((user: { login: string, pass: string }) => user.login === login && user.pass === pass);
    return user?.id
}

// async function findOneListingByName(client: any, nameOfListing: string = '') {
//     const result = await client.db("sample_airbnb").collection("listingsAndReviews")
//         .findOne({ name: nameOfListing });

//     if (result) {
//         console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
//         console.log(result);
//     } else {
//         console.log(`No listings found with the name '${nameOfListing}'`);
//     }
// }

export default {
    client,
    connect,
    close,
    getUserId,
}