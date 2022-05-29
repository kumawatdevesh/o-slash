import { TokenSignObj } from "../interfaces/auth";

const tokenSignObj = (user): TokenSignObj => {

    delete user[0]?.password

    return user
}

export {
    tokenSignObj
}