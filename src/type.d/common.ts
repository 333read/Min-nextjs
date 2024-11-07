export interface Root<T> {
    code: number
    msg: string
    data: T
}

export interface Data<T> {
    total: number
    items: T[]
}

export interface Item {
    id: number
    created_at: string
    updated_at: string
    name: string
    key: string
    icon: string
    description: string
    github: string
    class: string
    depends_version: string
    sort: number
    status: string
}