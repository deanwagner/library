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
        return this.formatText(this.title);
    }

    getAuthor() {
        return this.formatText(this.author);
    }

    getPages() {
        return this.pages.toString();
    }

    getPublished() {
        return this.formatDate(this.published);
    }

    getAcquired() {
        return this.formatDate(this.acquired);
    }

    formatText(str) {
        return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
    }

    formatDate(str) {
        return new Date(str).toLocaleDateString();
    }
}