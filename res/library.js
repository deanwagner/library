"use strict";

// Import Modules
import Theme from './theme.js';
import Books from './books.js';
import Modal from 'https://deanwagner.github.io/odin_project/modules/modal/modal.js';

/**
 * Personal Library
 * @class
 * @property {object} storage - LocalStorage
 * @property {object} modal   - Modal Module
 * @property {object} theme   - Theme Module
 * @property {object} books   - Books Module
 * @author Dean Wagner <info@deanwagner.net>
 */
class Library {

    // Class Properties
    storage = {};
    modal   = {};
    theme   = {};
    books   = {};

    /**
     * Constructor
     * @constructor
     */
    constructor() {

        // LocalStorage
        this.storage = window.localStorage;

        // Load Modules
        this.modal = new Modal();
        this.theme = new Theme(this.modal);
        this.books = new Books(this.modal);

        // Open History Modal
        document.getElementById('default_link').addEventListener('click', (e) => {
            e.preventDefault();
            this.modal.open('modal_default');
        });

        // History Cancel Button
        document.getElementById('default_cancel').addEventListener('click', (e) => {
            e.preventDefault();
            this.modal.close('modal_default');
        });

        // History Confirm Button
        document.getElementById('default_confirm').addEventListener('click', (e) => {
            e.preventDefault();
            this.storage.clear();
            this.modal.close('modal_default');
            location.reload();
        });

        // Mobile Alert Modal OK Button
        document.getElementById('mobile_confirm').addEventListener('click', (e) => {
            e.preventDefault();
            this.modal.close('modal_mobile');
        });
    }
}

export default Library;