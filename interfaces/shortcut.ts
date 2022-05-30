interface IShortcutReqObject {
    id?: string
    name: string
    link: string
    shortlink: string
    isActive?: boolean
    accessType?: string
    tags?: string[]
    description: string
    userId: string
}

export {
    IShortcutReqObject
}