/**
 * Middleware for time logger
 */

/** Package imports */
import { Request, Response, NextFunction } from "express";

/**
 * Output the time for every request
 * @param req 
 * @param res 
 * @param next 
 */
export const logTime = (req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV != 'test') {
        console.log('Log:', new Date().toLocaleString());
    }
    next();
}