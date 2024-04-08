DROP DATABASE IF EXISTS books;
CREATE DATABASE books;
\c books

DROP TABLE IF EXISTS books;
CREATE TABLE books (
    isbn TEXT PRIMARY KEY,
    amazon_url TEXT,
    author TEXT,
    language TEXT, 
    pages INTEGER,
    publisher TEXT,
    title TEXT, 
    year INTEGER
);

INSERT INTO books (isbn,amazon_url,author,language,pages,publisher,title,year)
VALUES (
    '0000000001', 
    'http://a.com/1', 
    'author 1', 
    'english', 
    264, 
    'Princeton University Press', 
    'book 1', 
    2017
);

\q
