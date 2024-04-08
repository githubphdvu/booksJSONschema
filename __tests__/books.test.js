//Integration tests for books routes
process.env.NODE_ENV = "test"
const request = require("supertest")

const app = require("../app")
const db = require("../db")

let book_isbn//sample
beforeEach(async () =>{
    let result = await db.query(
        `INSERT INTO books (isbn,amazon_url,author,language,pages,publisher,title,year)
        VALUES(
            '123432122',
            'https://amazon.com/taco',
            'Elie',
            'English',
            100,
            'Nothing publishers',
            'my first book', 2008)
        RETURNING isbn`)
    book_isbn = result.rows[0].isbn
})
afterEach(async ()=>await db.query("DELETE FROM BOOKS"))
afterAll(async  ()=>await db.end())

describe("",  ()=>{
    test("", async  ()=>{
        const response = await request(app).post(`/books`).send({
            isbn: '01',
            amazon_url: "https://a.com",
            author: "author 1",
            language: "english",
            pages: 100,
            publisher: "McHill",
            title: "book 1",
            year: 2000
            })
        expect(response.statusCode).toBe(201)
        expect(response.body.book).toHaveProperty("isbn")
    })
    test("", async  ()=>{
        const response = await request(app).post(`/books`).send({year:2000})//missing required fields
        expect(response.statusCode).toBe(400)//Bad Request
    })
    test("", async  ()=>{
        const response = await request(app).get(`/books`)
        const books = response.body.books
        expect(books).toHaveLength(1)//beforeEach test we inserted 1 book
        expect(books[0]).toHaveProperty("isbn")
        expect(books[0]).toHaveProperty("amazon_url")
    })
    test("", async  ()=>{
        const response = await request(app).get(`/books/${book_isbn}`)
        expect(response.body.book).toHaveProperty("isbn")
        expect(response.body.book.isbn).toBe(book_isbn)
    })
    test("", async  ()=>{
        const response = await request(app).get(`/books/999`)
        expect(response.statusCode).toBe(404)//Not Found
    })
    test("", async  ()=>{//update a book
        const response = await request(app).put(`/books/${book_isbn}`).send({
            amazon_url: "https://taco.com",
            author: "mctest",
            language: "english",
            pages: 1000,
            publisher: "NXB",
            title: "Book ABC",
            year: 2000
        })
        expect(response.body.book).toHaveProperty("isbn")
        expect(response.body.book.title).toBe("Book ABC")
    })
    test("", async  ()=>{
        const response = await request(app).put(`/books/${book_isbn}`).send({
            isbn: "32794782",
            badField: "what the hell",//try to update with non-exist
            amazon_url: "https://taco.com",
            author: "mctest",
            language: "english",
            pages: 1000,
            publisher: "yeah right",
            title: "UPDATED BOOK",
            year: 2000
        })
        expect(response.statusCode).toBe(400)//Bad Request
    })
    test("", async  ()=>{
        await request(app).delete(`/books/${book_isbn}`)
        const response = await request(app).delete(`/books/${book_isbn}`)//try to delete again
        expect(response.statusCode).toBe(404)//Not Found
    })
    test("", async  ()=>{
        const response = await request(app).delete(`/books/${book_isbn}`)
        expect(response.body).toEqual({message: "Book deleted"})//matched
    })
})
