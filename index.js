//import "./styles.css";
var Books = /** @class */ (function () {
    function Books(title, page, author, reading) {
        this.title = title;
        this.page = page;
        this.author = author;
        this.reading = reading;
        this.info = function () {
            return "".concat(this.title, " written by ").concat(this.author, ", ").concat(this.page, " pages, ").concat(this.reading, " ");
        };
    }
    return Books;
}());
var myLibrary = [];
function addToMyLibrary(b) {
    myLibrary.push(b);
    return myLibrary;
}
var container = document.querySelector(".container");
function bookItems() {
    for (var i = 0; i < myLibrary.length; i++) {
        var items = myLibrary[i];
        var book = document.createElement("div");
        book.classList.add("book");
        var info = document.createElement("ul");
        info.classList.add("info");
        container === null || container === void 0 ? void 0 : container.appendChild(book);
        book.appendChild(info);
        var bookInfo = Object.keys(items);
        var bookValue = Object.values(items);
        for (var i_1 = 0; i_1 < bookInfo.length; i_1++) {
            if (bookInfo[i_1] === "info")
                continue;
            var list = document.createElement("li");
            list.textContent = "".concat(bookInfo[i_1], ": ").concat(bookValue[i_1]);
            if (bookInfo[i_1] === "page")
                list.textContent += " pages";
            info.appendChild(list);
        }
    }
}
var bookOne = new Books("Romeo and Juliet", 144, "William Shakespeare", "read");
var bookTwo = new Books("Harry Potter and the Sorcerer's Stone", 270, "J.K Rowling", "not read");
var bookThree = new Books("Song of Ice and Fire", 332, "G.R.R Martin", "Read");
var addBookOne = addToMyLibrary(bookOne);
var addBookTwo = addToMyLibrary(bookTwo);
var addBookThree = addToMyLibrary(bookThree);
bookItems();
var form = document.forms[0];
function addBook() {
    var title = form.title.value;
    form.title.value = "";
    var pages = form.pages.value;
    form.pages.value = "";
    var author = form.author.value;
    form.author.value = "";
    var read = form.read.value;
    form.read.value = "";
    var setBook = new Books(title, pages, author, read);
    myLibrary.push(setBook);
    var item = myLibrary[myLibrary.length - 1];
    var book = document.createElement("div");
    book.classList.add("book");
    var info = document.createElement("ul");
    info.classList.add("info");
    container === null || container === void 0 ? void 0 : container.appendChild(book);
    book.appendChild(info);
    var bookInfo = Object.keys(item);
    var bookValue = Object.values(item);
    for (var i = 0; i < bookInfo.length; i++) {
        if (bookInfo[i] === "info")
            continue;
        var list = document.createElement("li");
        list.textContent = "".concat(bookInfo[i], ": ").concat(bookValue[i]);
        if (bookInfo[i] === "page")
            list.textContent += " pages";
        info.appendChild(list);
    }
}
form.addEventListener("submit", addBook);
form.addEventListener("submit", function (event) {
    event.preventDefault();
});
var button = document.querySelector(".add");
var formContainer = document.querySelector(".libraryform");
if (button) {
    button.addEventListener("click", function () {
        if (formContainer === null || formContainer === void 0 ? void 0 : formContainer.classList.contains("libraryform")) {
            formContainer.classList.toggle("hide");
        }
    });
}
else {
    console.error("No button selected!");
}
