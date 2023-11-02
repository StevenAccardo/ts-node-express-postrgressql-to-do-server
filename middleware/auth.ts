import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware for verifying the access token is valid before making any secondary requests to protected endpoints.
export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
): Response | undefined => {
    // Pull off the authorization header, take the second portion of the string which will contain the access token as a string.
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (token == null)
        return res.status(401).json({ message: 'Access token required.' });

    // Verify the token using the secret and pull the id off of the token body, and place it on the request body to be used by other endpoints after the middleware.
    try {
        const decodedPayload: any = jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
        );
        res.locals.userId = parseInt(decodedPayload.id);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Invalid access token.' });
    }

    // If all goes well, call next() to pass the request off to the next middleware or route handler.
    next();
};
