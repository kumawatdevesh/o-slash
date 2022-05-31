import * as dotenv from 'dotenv'
import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken';
import path from 'path'

dotenv.config({path: path.join(__dirname, '../.env')})

const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
       return res.send({code: 401, success: false, "message":"Invalid User", data: []})
    }
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err: Error, decoded: any) => {
        if (err) {
            return res.send({code: 401, success: false, "message":"Invalid token", data: []})
        } else {
            req.body.userId = decoded.data[0].id
            next();
        }
    })
}

export {
    verifyToken
}