class Book {

    id;
    title;
    author;
    pages;
    published;
    acquired;
    status;

    constructor(id, title, author, pages, published, acquired, status) {
        this.id        = id;
        this.title     = title;
        this.author    = author;
        this.pages     = parseInt(pages);
        this.published = published;
        this.acquired  = acquired;
        this.status    = parseInt(status);
    }

    toggleStatus() {
        this.status = (this.status) ? 0 : 1;
    }

    getStatus() {
        return (this.status) ? 'Read' : 'Unread';
    }

    getTitle() {
        let str = this._formatText(this.title);

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

        for (let i in replace) {
            str = str.replace(i, replace[i]);
        }

        return str;
    }

    getAuthor() {
        return this._formatText(this.author);
    }

    getPages() {
        return this.pages.toLocaleString();
    }

    getPublished() {
        return this._formatDate(this.published);
    }

    getAcquired() {
        return this._formatDate(this.acquired);
    }

    _formatText(str) {
        return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
    }

    _formatDate(str) {
        return new Date(str).toLocaleDateString();
    }
}