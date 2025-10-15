import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("books").del();

    // Inserts seed entries
    await knex("books").insert([
        { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee" },
        { id: 2, title: "1984", author: "George Orwell" },
        { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
        { id: 4, title: "The Catcher in the Rye", author: "J.D. Salinger" },
        { id: 5, title: "Pride and Prejudice", author: "Jane Austen" },
        { id: 6, title: "The Hobbit", author: "J.R.R. Tolkien" },
        { id: 7, title: "Fahrenheit 451", author: "Ray Bradbury" },
        { id: 8, title: "Moby-Dick", author: "Herman Melville" },
        { id: 9, title: "War and Peace", author: "Leo Tolstoy" },
        { id: 10, title: "The Odyssey", author: "Homer" },
    ]);
};
