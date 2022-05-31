import {knex} from '../database/knex'
import {agent as request} from 'supertest'
import {app} from '../app'
import { verifyToken } from '../middlewares/auth';
import { ITagReqObject } from '../interfaces/tag';
jest.useFakeTimers('legacy')

describe('Testing Shortcut apis', () => {

    const TAG_ENDPOINT: string='/api/v1/tag';
    const LOGIN_ENDPOINT: string = '/api/v1/login';
    let tag: ITagReqObject;
    let loginResponse;
    let authReq: any;

    beforeAll(async () => {

        const userLoginObj = {
            email: "kumawatdevesh99@gmail.com",
            password: "123456"
        }

        loginResponse = await request(app).post(LOGIN_ENDPOINT).send(userLoginObj);

        authReq = { headers: { authorization: loginResponse.body.data.token }, body: {userId: ""} }
        const next = jest.fn()
        verifyToken(authReq, loginResponse, next)
        
        await knex("tags").del().where({name: "zoom", userId: authReq.body.userId})
        tag = {
            name: "zoom",
            userId: authReq.body.userId,
            accessType: "PRIVATE",
            isActive: true
        }
        
        expect(next).toHaveBeenCalled()
    })

    it('it should create a new tag', async () => {

        const response = await request(app).post(TAG_ENDPOINT).send(tag).set({authorization: loginResponse.body.data.token});

        expect(response.status).toBe(201)
        expect(response.body.message).toBe('Tag created successfully!')
        expect(response.body.code).toBe(201)
        expect(response.body.data).toStrictEqual([])
        expect(response.body.success).toBe(true)
    })

    afterAll(async () => {
        await knex.destroy()
    })
})