import { AuthRequest } from '../Interfaces/AutorizationInterface';
import { Request, Response, NextFunction } from 'express';
require('dotenv').config()
const jwt = require("jsonwebtoken");
const errorMessage: string = 'Not Authorized'
export class AuthorizeService {

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
            return res.status(401).json({ message: errorMessage }) // if there isn't any token
        }

        jwt.verify(token, process.env.TOKEN_SECRET, (err: any, userId: string) => {
            if (err) {
                console.log('jwt error:', err)
                return res.sendStatus(403)
            }
            req.userId = userId
            next() // pass the execution off to whatever request the client intended
        })
    }

    setAutorization(req: Request, name: string): void {
        const session: any = req.session;
        session._email = name
    }

    checkAuthorize(req: Request, res: Response) {
        const session: any = req.session;
        const isAuthorized: boolean = Boolean(session._email)
        if (isAuthorized) {
            return true;
        }
        res.status(401).send({ message: errorMessage })
        return false
    }
}