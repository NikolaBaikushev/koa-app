export type User = {
    id: number,
    username: string,
    password: string,
    books: Book[]
}

export type Book = {
    id: number,
    author: string,
    title: string
}

export const data: { users: User[] } = {
    users: [
        {
            id: 1,
            username: 'Gosho',
            password: '123GoshoAngelov',
            books: [
                {
                    id: 1,
                    author: 'Pesho',
                    title: "Hronikite na Pesho"
                },
                {
                    id: 2,
                    author: 'Misho',
                    title: "Hronikite na Misho"
                },
                {
                    id: 3,
                    author: 'Tosho',
                    title: "Hronikite na Tosho"
                },
            ]
        },
        {
            id: 2,
            username: 'Tosho',
            password: '123ToshoAngelov',
            books: []
        },{
            id: 3,
            username: 'Misho',
            password: '123MishoAngelov',
            books: []
        },
        {
            id:4,
            username: 'test',
            password: 'test',
            books: [{
                id: 4,
                author: 'Sony',
                title: 'Sony Electronics'
            }]
        }
    ] as User[]
};

