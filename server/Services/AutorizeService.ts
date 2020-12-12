import { AuthRequest } from './../Interfaces/Autorization';
import { Request, Response, NextFunction } from 'express';
require('dotenv').config()
const jwt = require("jsonwebtoken");
export class AutorizeService {
    private readonly errorMessage: string = 'Not Autorized'

    generateAccessToken(username: string) {
        // expires after half and hour (1800 seconds = 30 minutes)
        return jwt.sign(username, process.env.TOKEN_SECRET);
        // return jwt.sign(username, ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 * 5 });
    }

    authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return res.status(401).json({ message: this.errorMessage }) // if there isn't any token
        }

        jwt.verify(token, process.env.TOKEN_SECRET, (err: any, user: any) => {
            console.log('jwt error:', err)
            if (err) return res.sendStatus(403)
            req.user = user
            next() // pass the execution off to whatever request the client intended
        })
    }

    setAutorization(req: Request, name: string): void {
        const session: any = req.session;
        session._email = name
    }

    checkAutorize(req: Request, res: Response) {
        const session: any = req.session;
        const isAutorized: boolean = Boolean(session._email)
        if (isAutorized) {
            return true;
        }
        res.status(401).send({ message: this.errorMessage })
        return false
    }
}