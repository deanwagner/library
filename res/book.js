"use strict";

/**
 * Book Class for Library
 * @class
 * @author Dean Wagner <info@deanwagner.net>
 */
class Book {

    // Class Properties
    id;
    title;
    author;
    pages;
    published;
    acquired;
    status;
    deleted;

    /**
     * Constructor
     * @constructor
     */
    constructor(id, title, author, pages, published, acquired, status, deleted) {
        this.id        = id;
        this.title     = title.trim();
        this.author    = author.trim();
        this.pages     = parseInt(pages);
        this.published = published;
        this.acquired  = acquired;
        this.status    = parseInt(status);
        this.deleted   = parseInt(deleted);
    }

    /**
     * Delete Book
     */
    delete() {
        this.deleted = 1;
    }

    /**
     * Restore Book
     */
    restore() {
        this.deleted = 0;
    }

    /**
     * Is Deleted
     * @returns {boolean} - T/F
     */
    isDeleted() {
        return (this.deleted === 1);
    }

    /**
     * Not Deleted
     * @returns {boolean} - T/F
     */
    notDeleted() {
        return (this.deleted === 0);
    }

    /**
     * Toggle Book Read/Unread Status
     */
    toggleStatus() {
        this.status = (this.status) ? 0 : 1;
    }

    /**
     * Get human-readable Read/Unread Status
     * @returns {string} - Status
     */
    getStatus() {
        return (this.status) ? 'Read' : 'Unread';
    }

    /**
     * Get Formatted Book Title
     * @returns {string} - Formatted Title
     */
    getTitle() {
        // Title Case
        let str = Book.#formatText(this.title);

        // Word Replacements
        const replace = {
            " A "    : " a ",
            " An "   : " an ",
            " And "  : " and ",
            " As "   : " as ",
            " At "   : " at ",
            " But "  : " but ",
            " By "   : " by ",
            " For "  : " for ",
            " If "   : " if ",
            " In "   : " in ",
            " Nor "  : " nor ",
            " Of "   : " of ",
            " Off "  : " off ",
            " On "   : " on ",
            " Or "   : " or ",
            " Per "  : " per ",
            " The "  : " the ",
            " To "   : " to ",
            "'S "    : "'s ",
            " So "   : " so ",
            " Up "   : " up ",
            " Via "  : " via ",
            " Yet "  : " yet "
        };

        // Replace Words
        for (let i in replace) {
            str = str.replace(i, replace[i]);
        }

        // Return Formatted Title
        return str;
    }

    /**
     * Get Formatted Author Name
     * @returns {string} - Formatted Author
     */
    getAuthor() {
        return Book.#formatText(this.author);
    }

    /**
     * Get Page Count as Local String
     * @returns {string} - Pages String
     */
    getPages() {
        return this.pages.toLocaleString();
    }

    /**
     * Get Formatted Published Date
     * @returns {string} - Published Date
     */
    getPublished() {
        return Book.#formatDate(this.published);
    }

    /**
     * Get Formatted Acquired Date
     * @returns {string} - Acquired Date
     */
    getAcquired() {
        return Book.#formatDate(this.acquired);
    }

    /**
     * Format Text to Title Case
     * @param   {string} str - Raw Text
     * @returns {string} - Formatted Text
     */
    static #formatText(str) {
        return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
    }

    /**
     * Format Date to Local String
     * @param   {string} str - Raw Date
     * @returns {string} - Formatted Date
     */
    static #formatDate(str) {
        return new Date(str).toLocaleDateString();
    }
}