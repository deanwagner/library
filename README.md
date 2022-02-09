# Library
Library App to Store, Track, and Sort a Book Collection

Live Demo:  
https://deanwagner.github.io/library/

![Project Screenshot](https://deanwagner.github.io/library/img/library-screenshot.png)

This project was created for the [Library assignment](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/library) as part of [The Odin Project](https://www.theodinproject.com) curriculum. I met all the assignment objectives and then expanded on it with my own concepts to make it more functional and user-friendly.

If you view the code you may notice that I chose to create and maintain two arrays of book objects, one for the library books and one for the deleted books. I deliberately chose to do it this way to demonstrate management and moving of data objects across multiple instances, even though it led to having some slightly redundant code. If this project were for production, all books would be stored together and differentiated by a simple `Book.deleted` property.

### Objectives

1. Store books as objects in an array
2. Display books in a table or as cards
3. Create New Book form to add books
4. Button for each book to remove it from library
5. Button for each book to change read/unread status

### Scope Creep

* __Fully customizable UI__ allowing user to control every color
* Utilized `LocalStorage` to save all user data between sessions
* Clickable headings to sort table by field, ascending and descending
* Recycle Bin to hold deleted books with restore or purge options
* Button for each book to edit book info
* Multi-select checkboxes to delete multiple books at once
* Summary statistics to display library info
* Global reset option to restore library to default data
* PWA and A2HS support