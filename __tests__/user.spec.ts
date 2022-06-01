import {knex} from '../database/knex'
import {agent as request} from 'supertest'
import {app} from '../app'
import { ILoginReqObject, IRegisterReqObject } from '../interfaces/auth';
import { errorResponse } from '../middlewares/error';
import { ErrorResponse } from '../utils/error';
import {verifyToken} from '../middlewares/auth';
jest.useFakeTimers('legacy')

describe('The register and login process', () => {

    const REGISTER_ENDPOINT: string='/api/v1/register';
    const LOGIN_ENDPOINT: string='/api/v1/login';
    const LOGOUT_ENDPOINT: string='/api/v1/logout';
    let userRegObj: IRegisterReqObject;
    let userLoginObj: ILoginReqObject;
    let req;
    let res;
    let loginResponse;
    let authReq: any;

    beforeAll(async () => {
        await knex('users').del().where({email: "test@gmail.com"})

        userRegObj = {
            email: "test@gmail.com",
            password: "test",
            fname: "test",
            lname: "last"
        }

        userLoginObj = {
            email: "kumawatdevesh99@gmail.com",
            password: "123456"
        }

        req = {
            params: {},
            body: {}
        }
      
        res = {
            data: null,
            code: null,
            status (status) {
                this.code = status
                return this
            },
            json (payload) {
                this.data = payload
            }
        }

        loginResponse = await request(app).post(LOGIN_ENDPOINT).send(userLoginObj);

        authReq = { headers: { authorization: loginResponse.body.data.token }, body: {userId: ""} }
        const next = jest.fn()
        verifyToken(authReq, loginResponse, next)

        expect(next).toHaveBeenCalled()
    })

    it('it should throw an error if required field is not present', async () => {

        const next = jest.fn()
        const err: ErrorResponse = {
            message: "please enter email with at least 3 char", 
            statusCode: 400,
            path: REGISTER_ENDPOINT,
            success: false,
            name: ""
        }

        errorResponse(err, req, res, next)

        expect(res.data.error).toBe('please enter email with at least 3 char')
        expect(res.data.statusCode).toBe(400)
        expect(res.data.success).toBe(false)
        expect(res.data.path).toBe(REGISTER_ENDPOINT)
    })

    it('it should register a new user', async () => {

        await request(app).post(REGISTER_ENDPOINT).send(userRegObj)
        .then(response => {
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User successfully registered!')
            expect(response.body.code).toBe(201)
            expect(response.body.success).toBe(true)
        })
    })

    it('it should return a 422 if user already exists', async () => {

        await request(app).post(REGISTER_ENDPOINT).send(userRegObj)
        .then(response => {
            expect(response.status).toBe(422);
            expect(response.body.message).toBe('Account with email exists!')
            expect(response.body.code).toBe(422)
            expect(response.body.success).toBe(true)
        })
    })

    it('it should login a user', async () => {

        await request(app).post(LOGIN_ENDPOINT).send(userLoginObj)
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.data.token).toBeDefined()
            expect(response.body.message).toBe('Success')
            expect(response.body.code).toBe(200)
            expect(response.body.success).toBe(true)
        })
    })

    it('it should return 404 if user do not exists', async () => {

        await request(app).post(LOGIN_ENDPOINT).send({...userLoginObj, email: "iam@gmail.com"})
        .then(response => {
            expect(response.status).toBe(404)
            expect(response.body.message).toBe('User with email do not exist!')
            expect(response.body.code).toBe(404)
            expect(response.body.success).toBe(true)
        })
    })

    it('it should return 401 if password is incorrect', async () => {

        await request(app).post(LOGIN_ENDPOINT).send({...userLoginObj, password: "dkjgdjgdj"})
        .then(response => {
            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Password is incorrect!')
            expect(response.body.code).toBe(401)
            expect(response.body.success).toBe(true)
        })
    })

    it('it should log user out', async () => {

        await request(app).post(LOGOUT_ENDPOINT)
        .set({authorization: loginResponse.body.data.token})
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.message).toBe('User logged out!')
            expect(response.body.code).toBe(200)
            expect(response.body.data).toStrictEqual([])
            expect(response.body.success).toBe(true)
        })
    })

    afterAll(async () => {
        await knex.destroy()
    })
})