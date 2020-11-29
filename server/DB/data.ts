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
        new Error('Object users has read only permissions')
    },
}

const _autData = [
    {
        login: 'Test',
        pass: 'Qweqwe34',
        id: "2915"
    }
]

const _users = [
    {
        "id": "2915",
        "name": "Alex",
        "surname": "Aagesen",
        "phone": "734-936-7175",
        "location": "Michigan Medicine NeuroSport | Domino's Farms",
        "specialties": "Sports Medicine (Physical Medicine & Rehab), Physical Medicine & Rehabilitation",
        "photo": "https://cdn.sanity.io/images/0vv8moc6/hcplive/0ebb6a8f0c2850697532805d09d4ff10e838a74b-200x200.jpg"
    }
]