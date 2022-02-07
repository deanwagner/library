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

    /**
     * Constructor
     * @constructor
     */
    constructor(id, title, author, pages, published, acquired, status) {
        this.id        = id;
        this.title     = title;
        this.author    = author;
        this.pages     = parseInt(pages);
        this.published = published;
        this.acquired  = acquired;
        this.status    = parseInt(status);
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
        let str = this._formatText(this.title);

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
        return this._formatText(this.author);
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
        return this._formatDate(this.published);
    }

    /**
     * Get Formatted Acquired Date
     * @returns {string} - Acquired Date
     */
    getAcquired() {
        return this._formatDate(this.acquired);
    }

    /**
     * Format Text to Title Case
     * @param   {string} str - Raw Text
     * @returns {string} - Formatted Text
     */
    _formatText(str) {
        return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
    }

    /**
     * Format Date to Local String
     * @param   {string} str - Raw Date
     * @returns {string} - Formatted Date
     */
    _formatDate(str) {
        return new Date(str).toLocaleDateString();
    }
}