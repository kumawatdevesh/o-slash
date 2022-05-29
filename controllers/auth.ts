import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import {ErrorResponse} from '../utils/error';
import {ILoginReqObject, IRegisterReqObject} from '../interfaces/auth';
import {knex} from '../database/knex';
import bcrypt from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { SuccessResponse } from "../utils/success";
import { tokenSignObj } from "../utils/auth";

// @desc    Login a user
// @route   /api/v1/login
const login = async (req:Request, res:Response, next: NextFunction): Promise<Response | void> => {

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty() && validationErrors['errors']) {
        return next(new ErrorResponse({error: validationErrors['errors'][0].msg, statusCode:400, path:req.originalUrl, success: false}))
    }
    
    try {
        const {email, password}: ILoginReqObject = req.body
    
        const existingUser: IRegisterReqObject[] = await knex('users').select('*').where({email});

        if(existingUser.length <= 0) {
            return res.status(404).json(new SuccessResponse({code: 404, data: [], success: true, message: "User with email do not exist!"}))
        }else {
            bcrypt.compare(password, existingUser[0].password, async (err: Error, result: boolean) => {
                if(!result) {
                    return res.status(401).json(new SuccessResponse({code: 401, message: "Password is incorrect!", data: [], success: true}))
                }else {

                    const token = await sign(JSON.stringify(tokenSignObj(existingUser)), "kjdbdkjhdkjhdjkdhkdhkjh")

                    return res.status(200).json(new SuccessResponse({code: 200, data: {token}, success: true, message: "Success"}))
                }
            })
        }
    }catch(e){ 
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

    try {
        const {fname, lname, isActive, email, password}: IRegisterReqObject = req.body

        const user: IRegisterReqObject = { fname, lname, isActive: isActive || true, email, password, id: uuidv4() }

        const existingUser: IRegisterReqObject[] = await knex('users').where({email})

        if(existingUser.length > 0) {
            return res.status(422).json(new SuccessResponse({code: 422, data: [], success: true, message: "Account with email exists!"}))
        }

        bcrypt.genSalt(10, (err: Error, salt: string): void => {
            bcrypt.hash(password, salt, async (err: Error, hash: string): Promise<Response> => {
                user.password = hash
                await Promise.all([
                    await knex("users").insert(user),
                ])
                return res.status(201).json(new SuccessResponse({code: 201, data: [], success: true, message: "User successfully registered!"}))
            })
        })

    }catch(e){ 
        return next(new ErrorResponse({error: 'Server Error!', statusCode:502, path:req.originalUrl, success: false}))
    }
}

export {
    login, 
    register
}