"use strict";

/**
 * Personal Library
 * @class
 * @author  Dean Wagner <info@deanwagner.net>
 */
class Library {

    books = [{
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

    trash = [{
        id        : 'lk6hsec5',
        title     : 'deleted book',
        author    : 'unlikable guy',
        pages     : 69,
        published : '1980-01-01',
        acquired  : '2020-09-10',
        status    : 1
    }, {
        id        : 'tyjhttjb',
        title     : 'another deleted book',
        author    : 'boring guy',
        pages     : 420,
        published : '1960-06-06',
        acquired  : '2021-05-08',
        status    : 0
    }, {
        id        : 'sdahwx3k',
        title     : 'a third deleted book',
        author    : 'unpleasant girl',
        pages     : 77,
        published : '1977-07-07',
        acquired  : '2022-02-02',
        status    : 1
    }];

    styles = [
        'shadow-text',
        'shadow-box',
        'glow-text',
        'glow-box',
        'border-solid',
        'outline-solid'
    ];

    settings = [
        'color-accent',
        'color-text',
        'color-bg',
        'color-dark',
        'color-light'
    ];

    base = {};

    /**
     * Constructor
     * @constructor
     */
    constructor() {

        // Class Elements
        this.tableBody  = document.querySelector('tbody');
        this.recycleBin = document.getElementById('deleted_books');

        // Build {base} from {settings} and CSS
        this.settings.forEach((index) => {
            // Get Value from Stylesheet
            this.base[index] = getComputedStyle(document.documentElement).getPropertyValue('--' + index).trim();

            // Add Event Listener to Settings Form
            document.getElementById(index).addEventListener('change', (e) => {
                document.documentElement.style.setProperty('--' + index, e.target.value);
            });
        });

        // Add Books to Table
        this.books.forEach((book) => {
            this.addTableRow(book);
        });

        // Add Trash to Recycle Bin
        this.trash.forEach((book) => {
            this.addTrashOption(book);
        });

        // Select/Deselect All Checkbox
        document.getElementById('select_all').addEventListener('input', (e) => {
            const checks = document.querySelectorAll("table input[type='checkbox']");
            for (let i = 0; i < checks.length; i++) {
                checks[i].checked = e.target.checked;
            }
        });

        // Default Acquired Date
        document.getElementById('new_acquired').valueAsDate = new Date();

        // Settings Reset Button
        document.getElementById('settings-reset').addEventListener('click', (e) => {
            e.preventDefault();
            this.resetSettings();
        });

        // Modal Close Button [X]
        const close = document.querySelectorAll('.close_modal');
        for (let i = 0; i < close.length; i++) {
            close[i].addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal(e.currentTarget.dataset.id);
            });
        }

        // Open Settings Button
        document.getElementById('settings_link').addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal('modal_settings');
        });

        // Delete Group Button
        document.getElementById('delete_group').addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal('modal_delete');
        });

        // Open Recycle Bin Button
        document.getElementById('recycle_link').addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal('modal_recycle');
        });

        // Add Book Button
        document.getElementById('add_link').addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal('modal_edit');
        });

        // Recycle Bin Restore Button
        document.getElementById('deleted_restore').addEventListener('click', (e) => {
            e.preventDefault();

            const selected = this.recycleBin.querySelectorAll('option:checked');
            for (let i = 0; i < selected.length; i++) {
                const bookID = selected[i].value;
                const item   = this.trash.find(b => b.id === bookID);
                this.books.push(item);
                this.trash = this.trash.filter(b => b.id !== bookID);
                this.removeTrashOption(bookID);
                this.addTableRow(item);
            }

            this.closeModal('modal_recycle');
        });

        // Recycle Bin Erase Button
        document.getElementById('deleted_erase').addEventListener('click', (e) => {
            e.preventDefault();

            const selected = this.recycleBin.querySelectorAll('option:checked');
            for (let i = 0; i < selected.length; i++) {
                const bookID = selected[i].value;
                this.trash = this.trash.filter(b => b.id !== bookID);
                this.removeTrashOption(bookID);
            }
        });

        // document.getElementById('delete_link').addEventListener('click', (e) => {
        //     e.preventDefault();
        //     this.openModal('modal_delete');
        // });
    }

    addTableRow(book) {
        const row = document.createElement('tr');
        row.id = book.id;
        row.innerHTML = `
            <td><input type="checkbox" id="select_${book.id}" name="selected[]" value="${book.id}"></td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${this.formatDate(book.published)}</td>
            <td>${this.formatDate(book.acquired)}</td>
            <td>${this.getStatus(book.status)}</td>
            <td>
                <a data-id="${book.id}" data-action="delete"  title="Delete" href="#"><svg viewBox="0 0 24 24">
                    <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />
                </svg></a>
                <a data-id="${book.id}" data-action="edit" title="Edit" href="#"><svg viewBox="0 0 24 24">
                    <path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
                </svg></a>
            </td>`;

        const a = row.querySelectorAll('td:last-child a');
        for (let i = 0; i < a.length; i++) {
            a[i].addEventListener('click', (e) => { this.editEntry(e); });
        }
        this.tableBody.appendChild(row);
    }

    removeTableRow(bookID) {
        document.getElementById(bookID).remove();
    }

    editEntry(e) {
        e.preventDefault();

        const bookID = e.currentTarget.dataset.id;
        const action = e.currentTarget.dataset.action;
        const item   = this.books.find(b => b.id === bookID);

        if (action === 'delete') {
            // Delete Entry
            this.trash.push(item);
            this.books = this.books.filter(b => b.id !== bookID);
            this.removeTableRow(bookID);
            this.addTrashOption(item);
        } else {
            // Edit Entry
            document.getElementById('new_title').value     = item.title;
            document.getElementById('new_author').value    = item.author;
            document.getElementById('new_pages').value     = item.pages;
            document.getElementById('new_published').value = item.published;
            document.getElementById('new_acquired').value  = item.acquired;
            document.getElementById('new_status').value    = item.status;
            document.getElementById('new_id').value        = item.id;

            this.openModal('modal_edit');
        }
    }

    addTrashOption(book) {
        const option = document.createElement('option');
        option.value = book.id;
        option.innerText = `"${book.title}" - ${book.author}`;
        this.recycleBin.appendChild(option);
    }

    removeTrashOption(bookID) {
        const options = this.recycleBin.getElementsByTagName('option');
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === bookID) {
                options[i].remove();
                i = options.length;
            }
        }
    }

    generateId() {
        return (Math.round(Date.now())).toString(36);
    }

    getStatus(status) {
        return (status) ? 'Read' : 'Unread';
    }

    formatDate(str) {
        return new Date(str).toLocaleDateString();
    }

    resetSettings() {
        this.settings.forEach((index) => {
            document.documentElement.style.setProperty('--' + index, this.base[index]);
            document.getElementById(index).value = this.base[index];
        });
    }

    closeModal(id) {
        const mask  = document.getElementById('modal');
        const modal = document.getElementById(id);
        mask.style.opacity = '0';
        mask.style.display = 'none';
        modal.style.display = 'none';
    }

    openModal(id) {
        const mask  = document.getElementById('modal');
        const modal = document.getElementById(id);
        modal.style.display = 'block';
        mask.style.display = 'flex';
        mask.style.opacity = '1';
    }
}

class Book {
    constructor(title, author, pages, published, acquired, status) {
        this.title     = title;
        this.author    = author;
        this.pages     = pages;
        this.published = published;
        this.acquired  = acquired;
        this.status    = status;
    }
}

