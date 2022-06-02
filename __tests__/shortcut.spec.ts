import {knex} from '../database/knex'
import {agent as request} from 'supertest'
import {app} from '../app'
import { IShortcutReqObject } from '../interfaces/shortcut';
import { verifyToken } from '../middlewares/auth';
import { ILoginReqObject } from '../interfaces/auth';
jest.useFakeTimers('legacy')

describe('Testing Shortcut apis', () => {

    const SHORTCUT_ENDPOINT: string='/api/v1/shortcut';
    const LOGIN_ENDPOINT: string = '/api/v1/login';
    let shortcut: IShortcutReqObject;
    let loginResponse;
    let authReq: any;
    let shortcutId: string;
    
    beforeAll(async () => {

        const userLoginObj: ILoginReqObject = {
            email: "kumawatdevesh99@gmail.com",
            password: "123456"
        }

        loginResponse = await request(app).post(LOGIN_ENDPOINT).send(userLoginObj);

        authReq = { headers: { authorization: loginResponse.body.data.token }, body: {userId: ""} }
        const next = jest.fn()
        verifyToken(authReq, loginResponse, next)
        
        await knex("shortcuts").del().where({name: "zoom", userId: authReq.body.userId})
        shortcut = {
            link: "https://zoom.com",
            name: "zoom",
            shortlink: "o/my/zoom",
            userId: authReq.body.userId,
            description: "This is zoom description",
            tags: ["70572f2f-9c7e-4682-9f38-7a6dbc2c4608"]
        }
        
        expect(next).toHaveBeenCalled()
    })

    it('it should create a new shortcut', async () => {

        const response = await request(app).post(SHORTCUT_ENDPOINT).send(shortcut).set({authorization: loginResponse.body.data.token});

        expect(response.status).toBe(201)
        expect(response.body.message).toBe('Shortcut created successfully!')
        expect(response.body.code).toBe(201)
        response.body.data.forEach(res => {
            expect(typeof res.shortcutId).toBe("string")
            shortcutId = res.shortcutId;
        })
        expect(response.body.success).toBe(true)
    })

    it('it should get all shortcuts for all users', async () => {

        const response = await request(app).get(SHORTCUT_ENDPOINT)
        .set({authorization: loginResponse.body.data.token});

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Success!')
        expect(response.body.code).toBe(200)
        response.body.data.forEach((res)=> {
            expect(typeof res.id).toBe("string")
            expect(typeof res.name).toBe("string")
            expect(typeof res.link).toBe("string")
            expect(typeof res.shortlink).toBe("string")
            expect(typeof res.description).toBe("string")
            expect(typeof res.isActive).toBe("number")
            expect(typeof res.accessType).toBe("string")
            expect(typeof res.createdAt).toBe("string")
            expect(typeof res.updatedAt).toBe("string")
            expect(typeof res.userId).toBe("string")
        })
        expect(response.body.success).toBe(true)
    })

    it('it should delete a shortcut', async () => {

        const response = await request(app).delete(SHORTCUT_ENDPOINT + `/${shortcutId}`)
        .set({authorization: loginResponse.body.data.token});

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Success!')
        expect(response.body.code).toBe(200)
        expect(response.body.data).toStrictEqual([])
        expect(response.body.success).toBe(true)
    })

    afterAll(async () => {
        await knex.destroy()
    })
})