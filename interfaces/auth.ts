interface ILoginReqObject {
    email: string
    password: string
}

interface IRegisterReqObject {
    id?: string
    fname: string
    lname: string
    password: string
    isActive?: boolean
    email: string
}

interface TokenSignObj {
    id: string
    fname: string
    lname: string
    isActive: string
    email: string
    profileImageUrl: string
}

export {
    ILoginReqObject,
    IRegisterReqObject,
    TokenSignObj
}