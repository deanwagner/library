"use strict";

/**
 * Personal Library
 * @class
 * @author  Dean Wagner <info@deanwagner.net>
 */
class Library {

    books = [];
    trash = [];
    base  = {};

    settings = [
        'color-accent',
        'color-text',
        'color-bg',
        'color-dark',
        'color-light'
    ];

    /**
     * Constructor
     * @constructor
     */
    constructor() {

        this.books[0] = new Book(
            'kz6hsec5',
            'The Divine Comedy',
            'Dante Alighieri',
            928,
            '1492-01-01',
            '2020-09-10',
            1
        );
        this.books[1] = new Book(
            'kz6httjb',
            'A Peoples History of the United States',
            'Howard Zinn',
            729,
            '1980-06-06',
            '2021-05-08',
            0
        );
        this.books[2] = new Book(
            'kz6hwx3k',
            'Thus Spake Zarathustra',
            'Friedrich Nietzsche',
            352,
            '1883-07-07',
            '2022-02-02',
            1
        );
        this.books[3] = new Book(
            'pl6hwx3k',
            'The Art of War',
            'Sun Tzu',
            68,
            '0000-01-01',
            '2022-01-20',
            1
        );

        this.trash[0] = new Book(
            'lk6hsec5',
            'deleted book',
            'unlikable guy',
            69,
            '1980-01-01',
            '2020-09-10',
            1
        );
        this.trash[1] = new Book(
            'tyjhttjb',
            'another deleted book',
            'boring guy',
            420,
            '1960-06-06',
            '2021-05-08',
            0
        );
        this.trash[2] = new Book(
            'sdahwx3k',
            'a third deleted book',
            'unpleasant girl',
            77,
            '1977-07-07',
            '2022-02-02',
            1
        );

        // Class Elements
        this.tableBody  = document.querySelector('tbody');
        this.recycleBin = document.getElementById('deleted_books');

        // Build {base} from [settings] and CSS
        this.settings.forEach((index) => {
            // Get Value from Stylesheet
            this.base[index] = getComputedStyle(document.documentElement).getPropertyValue('--' + index).trim();

            // Add Event Listener to Settings Form
            const input = document.getElementById(index);
            input.value = this.base[index];
            input.addEventListener('change', (e) => {
                document.documentElement.style.setProperty('--' + index, e.target.value);
            });
        });

        // Add Books to Table
        this.buildTable();

        // Add Trash to Recycle Bin
        this.buildTrash();

        // Update Summary Stats
        this.updateStats();

        // Select/Deselect All Checkbox
        document.getElementById('select_all').addEventListener('input', (e) => {
            const checks = document.querySelectorAll("table input[type='checkbox']");
            for (let i = 0; i < checks.length; i++) {
                checks[i].checked = e.target.checked;
            }
        });

        // Modal Close Button [X]
        const close = document.querySelectorAll('.close_modal');
        for (let i = 0; i < close.length; i++) {
            close[i].addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal(e.currentTarget.dataset.id);
            });
        }

        // Open Settings Modal
        document.getElementById('settings_link').addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal('modal_settings');
        });

        // Settings Reset Button
        document.getElementById('settings-reset').addEventListener('click', (e) => {
            e.preventDefault();
            this.resetSettings();
        });

        // Delete Group Button
        document.getElementById('delete_group').addEventListener('click', (e) => {
            e.preventDefault();
            const selected = this.tableBody.querySelectorAll("input[type='checkbox']:checked");
            for (let i = 0; i < selected.length; i++) {
                this.deleteBook(selected[i].value);
            }
            document.getElementById('select_all').checked = false;
        });

        // Open Recycle Bin Modal
        document.getElementById('recycle_link').addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal('modal_recycle');
        });

        // Open Add Book Modal
        document.getElementById('add_link').addEventListener('click', (e) => {
            e.preventDefault();

            document.querySelector('#modal_edit h3').innerText = 'Add New Book';
            document.querySelector('#new_book button').innerText = 'Add Book';
            document.getElementById('new_title').value = '';
            document.getElementById('new_author').value = '';
            document.getElementById('new_pages').value = '';
            document.getElementById('new_published').value = '';
            document.getElementById('new_acquired').valueAsDate = new Date();
            document.getElementById('new_status').value = '0';
            document.getElementById('new_id').value = '';

            this.openModal('modal_edit');
        });

        // Add Book Form Submit
        document.getElementById('new_book').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addBook();
            this.closeModal('modal_edit');
            return false;
        });

        // Recycle Bin Restore Button
        document.getElementById('deleted_restore').addEventListener('click', (e) => {
            e.preventDefault();

            const selected = this.recycleBin.querySelectorAll('option:checked');
            for (let i = 0; i < selected.length; i++) {
                this.restoreBook(selected[i].value);
            }

            this.closeModal('modal_recycle');
        });

        // Recycle Bin Erase Button
        document.getElementById('deleted_erase').addEventListener('click', (e) => {
            e.preventDefault();

            const selected = this.recycleBin.querySelectorAll('option:checked');
            for (let i = 0; i < selected.length; i++) {
                this.eraseBook(selected[i].value);
            }
        });

        // Mobile Alert Modal OK Button
        document.getElementById('mobile_confirm').addEventListener('click', (e) => {
            e.preventDefault();
            this.closeModal('modal_mobile');
        });

        // Table Header Sort Links
        const tableHeaders = document.querySelectorAll('th a');
        for (let i = 0; i < tableHeaders.length; i++) {
            tableHeaders[i].addEventListener('click', (e) => {
                e.preventDefault();
                const prop = e.target.id.replace('head_', '');
                this.sortBooks(e, prop);
            });
        }
    }

    updateStats() {
        let read   = 0;
        let unread = 0;
        let pages  = 0;
        for (let i = 0; i < this.books.length; i++) {
            pages = pages + this.books[i].pages;
            if (this.books[i].status) {
                read++;
            } else {
                unread++;
            }
        }

        const authors = this.books.reduce(
            (acc, x) => acc.concat(
                acc.find(
                    y => y.author.toLowerCase() === x.author.toLowerCase()
                ) ? [] : [x]
            ), []
        );

        document.getElementById('total_books').innerText   = this.books.length.toString();
        document.getElementById('total_pages').innerText   = pages.toLocaleString();
        document.getElementById('total_authors').innerText = authors.length.toString();
        document.getElementById('total_read').innerText    = read.toString();
        document.getElementById('total_unread').innerText  = unread.toString();
        document.getElementById('total_trash').innerText   = this.trash.length.toString();
    }

    sortBooks(e, prop) {
        this.books.sort((a, b) => (a[prop] > b[prop]) ? 1 : -1);

        const link = e.target;
        if (link.classList.contains('asc')) {
            link.classList.remove('asc');
            link.classList.add('dec');
            this.books.reverse();
        } else if (link.classList.contains('dec')) {
            link.classList.remove('dec');
            link.classList.add('asc');
        } else {
            const links = document.querySelectorAll('th a');
            for (let i = 0; i < links.length; i++) {
                links[i].classList.remove(...links[i].classList);
            }
            link.classList.add('asc');
        }

        this.buildTable();
    }

    addTableRow(book) {
        const row = document.createElement('tr');
        row.id = book.id;
        row.innerHTML = `
            <td><input type="checkbox" id="select_${book.id}" name="selected[]" value="${book.id}"></td>
            <td class="book_title">${book.getTitle()}</td>
            <td class="book_author">${book.getAuthor()}</td>
            <td class="book_pages">${book.getPages()}</td>
            <td class="book_published">${book.getPublished()}</td>
            <td class="book_acquired">${book.getAcquired()}</td>
            <td class="book_status">${book.getStatus()}</td>
            <td class="book_edit">
                <a data-id="${book.id}" data-action="delete" title="Delete Book" href="#"><svg viewBox="0 0 24 24">
                    <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />
                </svg></a>
                <a data-id="${book.id}" data-action="edit" title="Edit Book" href="#"><svg viewBox="0 0 24 24">
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

    buildTable() {
        this.tableBody.innerHTML = '';
        this.books.forEach((book) => {
            this.addTableRow(book);
        });
    }

    addBook() {
        const bookID = document.getElementById('new_id').value;
        const index  = this.indexFromBookID(bookID);
        if (bookID !== '') {
            this.books[index].title     = document.getElementById('new_title').value;
            this.books[index].author    = document.getElementById('new_author').value;
            this.books[index].pages     = document.getElementById('new_pages').value;
            this.books[index].published = document.getElementById('new_published').value;
            this.books[index].acquired  = document.getElementById('new_acquired').value;
            this.books[index].status    = document.getElementById('new_status').value;

            const row = document.getElementById(bookID);
            row.querySelector('.book_title').innerText     = this.books[index].getTitle();
            row.querySelector('.book_author').innerText    = this.books[index].getAuthor();
            row.querySelector('.book_pages').innerText     = this.books[index].getPages();
            row.querySelector('.book_published').innerText = this.books[index].getPublished();
            row.querySelector('.book_acquired').innerText  = this.books[index].getAcquired();
            row.querySelector('.book_status').innerText    = this.books[index].getStatus();
        } else {
            const newBook = new Book(
                this.generateId(),
                document.getElementById('new_title').value,
                document.getElementById('new_author').value,
                document.getElementById('new_pages').value,
                document.getElementById('new_published').value,
                document.getElementById('new_acquired').value,
                document.getElementById('new_status').value
            );
            this.books.push(newBook);
            this.addTableRow(newBook);
        }
        this.updateStats();
    }

    deleteBook(bookID) {
        const index = this.indexFromBookID(bookID);
        this.trash.push(this.books[index]);
        this.addTrashOption(this.books[index]);
        //this.books.splice(index, 1);
        this.books = this.books.filter(b => b.id !== bookID);
        this.removeTableRow(bookID);
        this.updateStats();
    }

    restoreBook(bookID) {
        const index = this.indexFromTrashID(bookID);
        this.books.push(this.trash[index]);
        this.addTableRow(this.trash[index]);
        //this.trash.splice(index, 1);
        this.trash = this.trash.filter(b => b.id !== bookID);
        this.removeTrashOption(bookID);
        this.updateStats();
    }

    eraseBook(bookID) {
        //this.trash.splice(bookID, 1);
        this.trash = this.trash.filter(b => b.id !== bookID);
        this.removeTrashOption(bookID);
        this.updateStats();
    }

    editEntry(e) {
        e.preventDefault();

        const bookID = e.currentTarget.dataset.id;
        const action = e.currentTarget.dataset.action;

        if (action === 'delete') {
            // Delete Entry
            this.deleteBook(bookID);
        } else {
            // Edit Entry
            const index = this.indexFromBookID(bookID);
            document.querySelector('#modal_edit h3').innerText = 'Edit Book';
            document.querySelector('#new_book button').innerText = 'Update Book';
            document.getElementById('new_title').value     = this.books[index].title;
            document.getElementById('new_author').value    = this.books[index].author;
            document.getElementById('new_pages').value     = this.books[index].pages;
            document.getElementById('new_published').value = this.books[index].published;
            document.getElementById('new_acquired').value  = this.books[index].acquired;
            document.getElementById('new_status').value    = this.books[index].status;
            document.getElementById('new_id').value        = this.books[index].id;

            this.openModal('modal_edit');
        }
    }

    buildTrash() {
        this.recycleBin.innerHTML = '';
        for (let i = 0; i < this.trash.length; i++) {
            this.addTrashOption(this.trash[i]);
        }
    }

    addTrashOption(book) {
        const option = document.createElement('option');
        option.value = book.id;
        option.innerText = `"${book.getTitle()}" - ${book.getAuthor()}`;
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

    indexFromBookID(bookID) {
        return this.books.findIndex(book => book.id === bookID);
    }

    indexFromTrashID(bookID) {
        return this.trash.findIndex(book => book.id === bookID);
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

