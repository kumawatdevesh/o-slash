import {Response, Request, NextFunction} from 'express';
import { v4 as uuidv4 } from 'uuid';
import {knex} from '../database/knex';
import {ErrorResponse} from '../utils/error';
import {SuccessResponse} from '../utils/success';
import {validationResult} from 'express-validator';
import { ITagReqObject } from '../interfaces/tag';

// @desc    Get shortcuts
// @route   /api/v1/shortcut
const createTag = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {

        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty() && validationErrors['errors']) {
            return next(new ErrorResponse({error: validationErrors['errors'][0].msg, statusCode:400, path: req.originalUrl, success: false}))
        }

        const {name, isActive, accessType, userId}: ITagReqObject = req.body

        const tag: ITagReqObject = {
            id: uuidv4(),
            name,
            isActive: isActive || true,
            accessType: accessType || "PRIVATE",
            userId: userId
        }   
                
        const existingTag: ITagReqObject[] = await knex("tags").where({name, userId: tag.userId})

        if(existingTag.length > 0) {
            return res.status(409).json(new SuccessResponse({code: 409, data: [], success: true, message: "Tag with title already exist!"}))
        } 

        await Promise.all([
            await knex("tags").insert(tag),
        ])
        return res.status(201).json(new SuccessResponse({code: 201, data: [], success: true, message: "Tag created successfully!"}))
    }catch(e) {
        return next(new ErrorResponse({error: 'Server Error!', statusCode: 502, path: req.originalUrl, success: false}))
    }
}

export {
    createTag
}