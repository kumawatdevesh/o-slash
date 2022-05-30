import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    console.log("req", req.headers)
    if (!req.headers.authorization) {
       return res.send({code: 401, success: false, "message":"Invalid User", data: []})
    }
    jwt.verify(req.headers.authorization, "kjdbdkjhdkjhdjkdhkdhkjh", (err, decoded) => {
        if (err) {
            return res.send({code: 401, success: false, "message":"Invalid token", data: []})
        } else {
            req.body.userId = decoded[0].id
            next();
        }
    })
}

export {
    verifyToken
}