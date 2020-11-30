export default {
    get users() {
        return _users
    },
    set users(data: any) {
        new Error('Object users has read only permissions')
    },
    get autData() {
        return _autData
    },
    set autData(data: any) {
        new Error('Object autData has read only permissions')
    },
    get clients() {
        return _clients
    },
    set clients(data: any) {
        new Error('Object autData has read only permissions')
    },
}

const _autData = [
    {
        login: 'Test',
        pass: 'Qweqwe34',
        id: "1606760413563"
    }
]

const _users = [
    {
        "id": "1606760413563",
        "name": "Alex",
        "surname": "Aagesen",
        "phone": "734-936-7175",
        "email": "a.aagesen@test.com",
        "location": "Michigan Medicine NeuroSport | Domino's Farms",
        "specialties": "Sports Medicine (Physical Medicine & Rehab), Physical Medicine & Rehabilitation",
        "photo": "https://cdn.sanity.io/images/0vv8moc6/hcplive/0ebb6a8f0c2850697532805d09d4ff10e838a74b-200x200.jpg"
    }
]

const _clients = [
    {
        "doctorID": "1606760413563",
        "id": "1606760413564",
        "name": "Petro",
        "surname": "Kukushka",
        "sex": "male",
        "age": "33",
        "pregnancy": "",
        "phone": "734-936-7175",
        "email": "a.kukushechka@test.com",
        "photo": "https://pbs.twimg.com/profile_images/962471262747529216/Uo8lOkRJ_400x400.jpg"

    },
    {
        "doctorID": "1606760413563",
        "id": "1606760413565",
        "name": "Egor",
        "surname": "Kukushka",
        "sex": "male",
        "age": "22",
        "pregnancy": "",
        "phone": "734-936-7175",
        "email": "a.kukushechka@test.com",
        "photo": "https://m.media-amazon.com/images/M/MV5BNGFhYjM1NjUtZmQyNC00OTlmLWI2ZTMtOWE4OWM4ZTdkN2VjXkEyXkFqcGdeQXVyNjMwOTA1MDM@._V1_.jpg"

    }, {
        "doctorID": "1606760413563",
        "id": "1606760413566",
        "name": "Kate",
        "surname": "Kukushka",
        "sex": "female",
        "age": "18",
        "pregnancy": "",
        "phone": "734-936-7175",
        "email": "a.kukushechka@test.com",
        "photo": "https://biotulin.com/wp-content/uploads/2019/09/kate-middleton-gettyimages-1061894502.jpg"

    }, {
        "doctorID": "1606760413563",
        "id": "1606760413567",
        "name": "Anton",
        "surname": "Kukushka",
        "sex": "male",
        "age": "44",
        "pregnancy": "",
        "phone": "734-936-7175",
        "email": "a.kukushechka@test.com",
        "photo": "https://i2-prod.mirror.co.uk/incoming/article22933438.ece/ALTERNATES/s615b/1_Anton-Du-Beke.jpg"

    }, {
        "doctorID": "1606760413563",
        "id": "1606760413568",
        "name": "Nagano",
        "surname": "Kukushka",
        "sex": "male",
        "age": "54",
        "pregnancy": "",
        "phone": "734-936-7175",
        "email": "a.kukushechka@test.com",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/5/54/Anton_Anton_2017.jpg"
    }, {
        "doctorID": "1606760413563",
        "id": "1606760413569",
        "name": "Lolita",
        "surname": "Kukushka",
        "sex": "female",
        "age": "25",
        "pregnancy": "6",
        "phone": "734-936-7175",
        "email": "a.kukushechka@test.com",
        "photo": "https://chayka.lv/wp-content/uploads/2019/08/3.jpg"

    }, {
        "doctorID": "1606760413563",
        "id": "1606760413573",
        "name": "Pupok",
        "surname": "Kukushka",
        "sex": "male",
        "age": "33",
        "pregnancy": "",
        "phone": "734-936-7175",
        "email": "a.kukushechka@test.com",
        "photo": "https://static4.depositphotos.com/1006542/284/i/600/depositphotos_2843876-stock-photo-womans-belly.jpg"

    }, {
        "doctorID": "1606760413563",
        "id": "1606760413571",
        "name": "ChaCha",
        "surname": "Kukushka",
        "sex": "male",
        "age": "2",
        "pregnancy": "",
        "phone": "734-936-7175",
        "email": "a.kukushechka@test.com",
        "photo": "https://www.emmasdiary.co.uk/images/default-source/default-album/10-months.jpg"

    }, {
        "doctorID": "1606760413563",
        "id": "1606760413572",
        "name": "Ulia",
        "surname": "Kukushka",
        "sex": "male",
        "age": "0.5",
        "pregnancy": "",
        "phone": "734-936-7175",
        "email": "a.kukushechka@test.com",
        "photo": "https://static.scientificamerican.com/blogs/cache/file/7069F0BB-A9AB-4932-84F508BBC0136458_source.jpg"

    },
]