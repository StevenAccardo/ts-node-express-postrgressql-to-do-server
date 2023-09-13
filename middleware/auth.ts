import type { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
): Response | undefined => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (token == null)
        return res.status(401).json({ message: 'Access token required.' });

    try {
        const decodedPayload: any = verify(
            token,
            process.env.JWT_SECRET as string,
        );
        req.body.userId = decodedPayload.id;
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Invalid access token.' });
    }

    next();
};
