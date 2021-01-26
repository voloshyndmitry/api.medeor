export interface User {
    id: string,
    email: string,
    pass: string,
    name?: string,
    surname?: string,
    phone?: string,
    location?: string,
    specialties?: string,
    photo?: string
}

export interface UserAutData { login: string, pass: string, id: string }
