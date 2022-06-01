import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/error";
import { v4 as uuidv4 } from 'uuid';
import {knex} from '../database/knex';
import { SuccessResponse } from "../utils/success";
import {validationResult} from 'express-validator';
import { IShortcutReqObject } from "../interfaces/shortcut";
import { ISearch } from "../interfaces/search";
import { ILogReqObject } from "../interfaces/log";

// @desc    Create a shortcut
// @route   /api/v1/shortcut
const createShortCut = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {

        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty() && validationErrors['errors']) {
            return next(new ErrorResponse({error: validationErrors['errors'][0].msg, statusCode:400, path:req.originalUrl, success: false}))
        }

        const {name, link, shortlink, description, isActive, accessType, userId, tags}: IShortcutReqObject = req.body

        const shortcut: IShortcutReqObject = {
            id: uuidv4(),
            name,
            link,
            shortlink,
            description,
            isActive: isActive || true,
            accessType: accessType || "PRIVATE",
            userId: userId
        }   

        const existingShortcut: IShortcutReqObject[] = await knex("shortcuts").where({name, userId: userId})
        
        if(existingShortcut.length > 0) {
            return res.status(409).json(new SuccessResponse({code: 409, data: [], success: true, message: "Shortlink with title already exist!"}))
        } 
        
        await Promise.all([
            await knex("shortcuts").insert(shortcut),
        ])
        if(tags.length > 0) {
            await knex("shortcuts_tags").insert(tags.map(tag => ({id: uuidv4(), tagId: tag, shortcutId: shortcut.id})))
        }

        return res.status(201).json(new SuccessResponse({code: 201, data: [], success: true, message: "Shortcut created successfully!"}))
    }catch(e) {
        return next(new ErrorResponse({error: 'Server Error!', statusCode: 502, path: req.originalUrl, success: false}))
    }
}

// @desc    Get shortcuts
// @route   /api/v1/shortcut
const getShortcuts = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    
    let log: ILogReqObject
    try {

        let query: string = `SELECT *, (SELECT GROUP_CONCAT(tagId SEPARATOR ',') FROM shortcuts_tags as st WHERE st.shortcutId=s.id) as tags FROM shortcuts as s where userId='${req.body.userId}'`;
        let offset: number = 0;

        const {orderField, orderType, page, limit=20, searchQuery}: ISearch = req.body;

        log = {id: uuidv4(), eventType: "READ", eventDescription: "Reading shortcuts", userId: req.body.userId, objectName: "shortcuts", objectId: req.body.userId}

        if(page) {
            offset = (page - 1) * limit;
        }

        if(searchQuery) {
            query += ` AND shortlink=${searchQuery} OR description=${searchQuery}`;
        }

        if(orderType && orderField) {
            query += ` ORDER BY ${orderField} ${orderType} limit ${limit} offset ${offset}`;
        }

        const shortcuts = await knex.raw(query)
        await knex("logs").insert(log)
        
        return res.status(200).json(new SuccessResponse({code: 200, data: shortcuts[0], success: true, message: "Success!"}))
    }catch(e) {
        log = {id: uuidv4(), eventType: "READ", eventDescription: "Error ocurred while getting shortcuts", userId: req.body.userId, objectName: "shortcuts", objectId: ""}
        await knex("logs").insert(log)
        return next(new ErrorResponse({error: 'Server Error!', statusCode: 502, path: req.originalUrl, success: false}))
    }
}

// @desc    Delete shortcut
// @route   /api/v1/shortcut/:id
const deleteShortcut = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    let log: ILogReqObject;
    try {
        const shortcutId: string = req.params.id

        log = {id: uuidv4(), eventType: "DELETE", eventDescription: "Deleting shortcut!", userId: req.body.userId, objectName: "shortcuts", objectId: shortcutId}

        await Promise.all([
            await knex("shortcuts").del().where({id: shortcutId, userId: req.body.userId}),
            await knex("logs").insert(log)
        ])
        return res.status(200).json(new SuccessResponse({code: 200, data: [], success: true, message: "Success!"}))
    }catch(e) {
        log = {id: uuidv4(), eventType: "READ", eventDescription: "Error occured while deleting shortcut", userId: req.body.userId, objectName: "shortcuts", objectId: req.params.id}
        await knex("logs").insert(log)
        return next(new ErrorResponse({error: 'Server Error!', statusCode: 502, path: req.originalUrl, success: false}))
    }
}

export {
    createShortCut,
    getShortcuts,
    deleteShortcut
}