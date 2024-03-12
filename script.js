const library = document.getElementById("libraryShowcase");
const addBookBtn = document.getElementById("addBtn");
const dialogForm = document.getElementById("addBookDialog");
const confirmBtn = dialogForm.querySelector("#confirmBtn");
const cancelBtn = dialogForm.querySelector("#cancelBtn");

const myLibrary = [];

// Starter books to fill the array
const harryPotter = new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", "223", true);
const lotr = new Book("The Fellowship of the Ring", "J.R.R. Tolkien", "432", false);
const got = new Book("A Game of Thrones", "George R.R. Martin", "694", false);
const lww = new Book("The Lion, the Witch, and the Wardrobe", "C.S. Lewis", "208", false);

myLibrary.push(harryPotter, lotr, got, lww);

// Constructor for Book object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    // Returns a string of Book info. Not used in this project
    this.info = function() {
        return "Title: " + title + "\n" + "Author: " + author + "\n" + "Pages: " + pages + "\n" + "Status: " + read;
    }
}

// Function to toggle status of read/unread added to Book's prototype
Book.prototype.toggleStatus = function () {
    this.read = !this.read;
};

// Function to add new Book to myLibrary[]
function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

// Function to display all books in myLibrary[] onto div cards
function displayBooks() {
    // Clears the old cards so that the display refreshes with elements from myLibrary[]
    document.getElementById("libraryShowcase").innerHTML = "";

    // Iterates through myLibrary[] and creates a new div with components within for each book object's attributes
    for (let i = 0; i < myLibrary.length; i++) {
        const newBookDiv = document.createElement("div");
        const title = document.createElement("p");
        const author = document.createElement("p");
        const pages = document.createElement("p");
        const read = document.createElement("p");
        const delBtn = document.createElement("button");
        const readBtn = document.createElement("button");

        // Adding classes and attributs as needed for each component
        newBookDiv.classList.add("card");
        newBookDiv.setAttribute("id", i);
        delBtn.classList.add("delete");
        delBtn.setAttribute("id", i);
        readBtn.setAttribute("data", i);
        readBtn.classList.add("readBtn");

        // Creating text nodes with book information
        const titleContent = document.createTextNode(myLibrary[i].title);
        const authorContent = document.createTextNode(myLibrary[i].author);
        const pagesContent = document.createTextNode(myLibrary[i].pages);
        const readContent = document.createTextNode(myLibrary[i].read ? "Read" : "Not Read Yet");

        // Appending text nodes to components
        title.appendChild(titleContent);
        author.appendChild(authorContent);
        pages.appendChild(pagesContent);
        read.appendChild(readContent);
        delBtn.textContent = "Delete";
        readBtn.textContent = myLibrary[i].read ? "Mark as unread" : "Mark as read";

        // Appending components to the card div
        newBookDiv.appendChild(title);
        newBookDiv.appendChild(author);
        newBookDiv.appendChild(pages);
        newBookDiv.appendChild(read);
        newBookDiv.appendChild(delBtn);
        newBookDiv.appendChild(readBtn);

        // Appending cards to the container
        library.appendChild(newBookDiv);

        // Listener for the Delete button. Deletes a card and re-displays myLibrary[]
        delBtn.addEventListener("click", (e) => {
            myLibrary.splice(parseInt(e.target.id), 1);
            displayBooks();
        });

        // Listener for Marked as read/unread button. Toggles the read status and re-displays myLibrary[]
        readBtn.addEventListener("click", () => {
            const bookIndex = parseInt(readBtn.getAttribute('data'));
            myLibrary[bookIndex].toggleStatus();
            displayBooks();
        });
    }
}

// Listener for the add book button. Opens a form in modal
addBookBtn.addEventListener("click", () => {
    dialogForm.showModal();
});

// Listener for the confirm button within the form modal. Gathers user input and creates a new book
confirmBtn.addEventListener("click", (e) => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;

    myLibrary.push(new Book(title, author, pages, false));

    displayBooks();

    e.preventDefault();
    dialogForm.close();
});

// Listener for the cancel button within the form modal. Exits the modal
cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialogForm.close();
});

displayBooks();