import * as dotenv from 'dotenv'
import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import {ErrorResponse} from '../utils/error';
import {ILoginReqObject, IRegisterReqObject} from '../interfaces/auth';
import {ILogReqObject} from '../interfaces/log';
import {knex} from '../database/knex';
import bcrypt from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { SuccessResponse } from "../utils/success";
import { tokenSignObj } from "../utils/auth";
import path from 'path'

dotenv.config({path: path.join(__dirname, '../.env')})

// @desc    Login a user
// @route   /api/v1/login
const login = async (req:Request, res:Response, next: NextFunction): Promise<Response | void> => {

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty() && validationErrors['errors']) {
        return next(new ErrorResponse({error: validationErrors['errors'][0].msg, statusCode:400, path:req.originalUrl, success: false}))
    }

    let log: ILogReqObject;
    let existingUser: IRegisterReqObject[];
    
    try {
        const {email, password}: ILoginReqObject = req.body
    
        existingUser = await knex('users').select('*').where({email});

        if(existingUser.length <= 0) {
            return res.status(404).json(new SuccessResponse({code: 404, data: [], success: true, message: "User with email do not exist!"}))
        }else {
            bcrypt.compare(password, existingUser[0].password, async (err: Error, result: boolean) => {
                if(!result) {
                    return res.status(401).json(new SuccessResponse({code: 401, message: "Password is incorrect!", data: [], success: true}))
                }else {

                    log = {id: uuidv4(), eventType: "CREATE", eventDescription: "User logged in", userId: existingUser[0].id, objectName: "users", objectId: existingUser[0].id}
                    await knex("logs").insert(log)

                    const token = await sign({data: tokenSignObj(existingUser)}, process.env.JWT_SECRET, {expiresIn: '24h'})
                    return res.status(200).json(new SuccessResponse({code: 200, data: {token}, success: true, message: "Success"}))
                }
            })
        }
    }catch(e){ 
        log = {id: uuidv4(), eventType: "CREATE", eventDescription: "Error ocurred while logging user", userId: existingUser[0].id, objectName: "users", objectId: existingUser[0].id}
        await knex("logs").insert(log)
        return next(new ErrorResponse({error: 'Server Error!', statusCode:502, path:req.originalUrl, success: false}))
    }
}

// @desc    Register a user
// @route   /api/v1/register
const register = async (req:Request, res:Response, next: NextFunction): Promise<Response | void> => {

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty() && validationErrors['errors']) {
        return next(new ErrorResponse({error: validationErrors['errors'][0].msg, statusCode:400, path:req.originalUrl, success: false}))
    }

    let log: ILogReqObject;
    let id: string;

    try {
        const {fname, lname, isActive, email, password}: IRegisterReqObject = req.body

        id=uuidv4()
        const user: IRegisterReqObject = { fname, lname, isActive: isActive || true, email, password, id: uuidv4() }

        const existingUser: IRegisterReqObject[] = await knex('users').where({email})

        log = {id: uuidv4(), eventType: "CREATE", eventDescription: "User registered", userId: id, objectName: "users", objectId: id}

        if(existingUser.length > 0) {
            return res.status(422).json(new SuccessResponse({code: 422, data: [], success: true, message: "Account with email exists!"}))
        }

        bcrypt.genSalt(10, (err: Error, salt: string): void => {
            bcrypt.hash(password, salt, async (err: Error, hash: string): Promise<Response> => {
                user.password = hash
                await Promise.all([
                    await knex("users").insert(user),
                    await knex("logs").insert(log)
                ])
                return res.status(201).json(new SuccessResponse({code: 201, data: [], success: true, message: "User successfully registered!"}))
            })
        })

    }catch(e){
        log = {id: uuidv4(), eventType: "CREATE", userId: id, objectName: "users", objectId: id, eventDescription: "Error ocurred while registering user"}
        await knex("logs").insert(log) 
        return next(new ErrorResponse({error: 'Server Error!', statusCode:502, path:req.originalUrl, success: false}))
    }
}

// @desc    Log user out
// @route   /api/v1/logout
const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        sign(JSON.stringify({}), process.env.JSW_SECRET, {expiresIn: '1ms'})
    }catch(e) {
        return next(new ErrorResponse({error: 'Server Error!', statusCode:502, path:req.originalUrl, success: false}))
    }
}

export {
    login, 
    register,
    logout
}