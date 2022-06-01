import * as dotenv from 'dotenv'
import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken';
import {knex} from '../database/knex'
import path from 'path'

dotenv.config({path: path.join(__dirname, '../.env')})

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
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

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {

    const userToken = await knex("users").select("userToken").where({id: req.body.userId})
    
    if(!userToken[0].userToken) {
        return res.send({code: 401, success: false, "message":"Please sign in!", data: []})
    }

    jwt.verify(userToken[0].userToken, process.env.JWT_SECRET, (err: Error, decoded: any) => {
        if (err) {
            return res.send({code: 401, success: false, "message":"Invalid token", data: []})
        } else {
            req.body.userId = decoded.data[0].id
            next();
        }
    })
}

export {
    verifyToken,
    authenticateUser
}