const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ultrauser:eLUaVMgDWXfy6ycU@clustermedeor.tpng0.mongodb.net/medeordb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const listDatabases = async () => {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach((db: any) => console.log(` - ${db.name}`));
};

const listConnections = async () => {
    const collections = await client.db("medeordb").listCollections().toArray();

    console.log('collections: ', collections);

};

const printUsers = async () => {
    const result = await client.db("medeordb").collection("clients")
        .find().toArray()

    if (result) {
        console.log('result:');
        result.map((client: any) => console.log(client));
    }
}

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

const getUserDataById = async (id: string) => {
    const { data: result } = await client.db("medeordb").collection("users")
        .findOne()
    return result.find((user: { id: string }) => user.id === id)
}

const getClientsByDoctorId = async (id: string) => {
    const { clients: result } = await client.db("medeordb").collection("clients")
        .findOne()
    return result.filter?.((user: { doctorID: string }) => user.doctorID === id)
}

const getClientById = async (id: string) => {
    const { clients: result } = await client.db("medeordb").collection("clients")
        .findOne()
    return result?.find?.((user: { id: string }) => user.id === id)
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

export default { connect, close, getUserId, getUserDataById, getClientsByDoctorId, getClientById }