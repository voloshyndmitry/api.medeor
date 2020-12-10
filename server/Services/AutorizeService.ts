import { Request, Response } from 'express';

export class AutorizeService {
    private readonly errorMessage: string = 'Not Autorized'

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