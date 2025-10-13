type User = {
    id: number,
    username: string,
    password: string,
}

export const data: { users: User[] } = {
    users: [
        {
            id: 1,
            username: 'Gosho',
            password: '123GoshoAngelov'
        },
        {
            id: 2,
            username: 'Tosho',
            password: '123ToshoAngelov'
        },{
            id: 3,
            username: 'Misho',
            password: '123MishoAngelov'
        }
    ] as User[]
}

