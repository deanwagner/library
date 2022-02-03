"use strict";

/**
 * Personal Library
 * @class
 * @author  Dean Wagner <info@deanwagner.net>
 */
class Library {

    /**
     * Constructor
     * @constructor
     */
    constructor() {

        this.books = [{
            id        : 'kz6hsec5',
            title     : 'some book',
            author    : 'some guy',
            pages     : 69,
            published : '1980-01-01',
            acquired  : '2020-09-10',
            status    : 1
        }, {
            id        : 'kz6httjb',
            title     : 'another book',
            author    : 'another guy',
            pages     : 420,
            published : '1960-06-06',
            acquired  : '2021-05-08',
            status    : 0
        }, {
            id        : 'kz6hwx3k',
            title     : 'a third book',
            author    : 'some girl',
            pages     : 77,
            published : '1977-07-07',
            acquired  : '2022-02-02',
            status    : 1
        }];

        this.tableBody = document.querySelector('tbody');

        this.books.forEach((book) => {
            this.addBook(book);
        });

        document.getElementById('new_acquired').valueAsDate = new Date();
    }

    addBook(book) {
        const row = document.createElement('tr');
        row.id = book.id;
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.published}</td>
            <td>${book.acquired}</td>
            <td>${this.getStatus(book.status)}</td>
            <td>
                <a data-id="${book.id}" data-action="edit" title="Edit" href="#"><svg viewBox="0 0 24 24">
                    <path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
                </svg></a>
                <a data-id="${book.id}" data-action="delete"  title="Delete"href="#"><svg viewBox="0 0 24 24">
                    <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />
                </svg></a>
            </td>`;
        this.tableBody.appendChild(row);
    }

    generateId() {
        return (Math.round(Date.now())).toString(36);
    }

    getStatus(status) {
        return (status) ? 'Read' : 'Unread';
    }
}
/*
class Book {
    constructor(title, author, pages, published, acquired, status) {
        this._title     = title;
        this._author    = author;
        this._pages     = pages;
        this._published = published;
        this._acquired  = acquired;
        this._status    = status;
    }

    get title() {
        return this._title;
    }

    set title(title) {
        this._title = title;
    }
}
*/
