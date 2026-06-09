"use strict";
//import "./styles.css";
// import { v4 as uuidv4 } from "uuid";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
class Books {
    constructor(id, title, page, author, reading, cover) {
        this.id = id;
        this.title = title;
        this.page = page;
        this.author = author;
        this.reading = reading;
        this.cover = cover;
    }
    info() {
        return `${this.title} written by ${this.author}, ${this.page} pages, ${this.reading}`;
    }
}
// --- localStorage helpers ---
const STORAGE_KEY = "myLibrary";
function saveLibrary(library) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
}
const searchLibrary = (title = "") => {
    const query = title.trim();
    if (query === "")
        return myLibrary;
    const regExp = new RegExp(query, "i");
    return myLibrary.filter((book) => regExp.test(book.title));
};
const deleteBook = (id) => {
    const index = myLibrary.findIndex((b) => b.id === id);
    if (index !== -1)
        myLibrary.splice(index, 1);
    saveLibrary(myLibrary);
};
const toggleRead = (id) => {
    myLibrary = myLibrary.map((item) => {
        if (item.id === id) {
            item.reading = item.reading === "not read" ? "read" : "not read";
        }
        return item;
    });
    saveLibrary(myLibrary);
};
function loadLibrary() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored)
        return [];
    const parsed = JSON.parse(stored);
    return parsed.map((b) => new Books(b.id, b.title, b.page, b.author, b.reading, b.cover));
}
// ---
let myLibrary = loadLibrary();
function addToMyLibrary(b) {
    myLibrary.push(b);
    saveLibrary(myLibrary);
    return myLibrary;
}
const container = document.querySelector(".container");
function renderBook(item) {
    const book = document.createElement("div");
    book.classList.add("book");
    book.id = item.id;
    const info = document.createElement("ul");
    info.classList.add("info");
    container === null || container === void 0 ? void 0 : container.appendChild(book);
    const img = document.createElement("img");
    img.src = item.cover || "./images/blank.jpg";
    img.classList.add("img");
    book.appendChild(img);
    book.appendChild(info);
    const fields = ["title", "author", "page", "reading"];
    for (const field of fields) {
        const list = document.createElement("li");
        if (field === "page") {
            list.textContent = `${field}: ${item[field]} pages`;
        }
        else if (field === "reading") {
            list.setAttribute("data-status", String(item[field]));
            list.textContent = "";
        }
        else {
            list.textContent = `${field}: ${item[field]}`;
        }
        info.appendChild(list);
    }
    const cancel = document.createElement("button");
    cancel.classList.add("deleteBook");
    cancel.innerHTML = "&times;";
    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.classList.add("toggleRead");
    toggleReadBtn.textContent =
        item.reading === "read" ? "Mark as Not Read" : "Mark as Read";
    const editButton = document.createElement("button");
    editButton.classList.add("editBtn");
    editButton.textContent = "Edit";
    const actions = document.createElement("div");
    actions.classList.add("book-actions");
    actions.append(toggleReadBtn, editButton, cancel);
    book.appendChild(actions);
}
function bookItems() {
    if (!container)
        return;
    if (myLibrary.length === 0) {
        const msg = document.createElement("p");
        msg.classList.add("empty-state");
        msg.textContent = "Your library is empty. Add a book to get started.";
        container.appendChild(msg);
    }
    for (const book of myLibrary) {
        renderBook(book);
    }
}
const searchInput = document.querySelector(".search");
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener("input", (event) => {
    const target = event.target;
    const query = target.value;
    const results = searchLibrary(query);
    if (container) {
        container.innerHTML = "";
        results.forEach(renderBook);
    }
});
// Only seed default books if localStorage is empty
if (myLibrary.length === 0) {
    const bookOne = new Books(crypto.randomUUID(), "Romeo and Juliet", 144, "William Shakespeare", "read", "./images/blank.jpg");
    const bookTwo = new Books(crypto.randomUUID(), "Harry Potter and the Sorcerer's Stone", 270, "J.K Rowling", "not read", "./images/blank.jpg");
    const bookThree = new Books(crypto.randomUUID(), "Song of Ice and Fire", 332, "G.R.R Martin", "read", "./images/blank.jpg");
    addToMyLibrary(bookOne);
    addToMyLibrary(bookTwo);
    addToMyLibrary(bookThree);
}
bookItems();
const form = document.querySelector("#book-form");
let editingId = null;
function addBook(event) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        event.preventDefault();
        if (!form)
            return;
        const { title, pages, author, read } = form.elements;
        if (editingId === null) {
            const readingStatus = read.value === "read" ? "read" : "not read";
            let titleQuery = title.value.trim();
            let authorQuery = author.value.trim();
            try {
                const response = yield fetch(`https://openlibrary.org/search.json?title=${titleQuery}&author=${authorQuery}`);
                if (!response.ok)
                    throw new Error(`${response.status}: Something wrong!`);
                const data = yield response.json();
                const coverId = (_b = (_a = data.docs) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.cover_i;
                const thumbnail = coverId
                    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
                    : "./images/blank.jpg";
                const newBook = new Books(crypto.randomUUID(), title.value, Number(pages.value), author.value, readingStatus, thumbnail);
                addToMyLibrary(newBook);
                renderBook(newBook);
                form.reset();
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            const item = myLibrary.find((b) => b.id === editingId);
            if (!item)
                return;
            const editedBook = new Books(editingId, title.value, Number(pages.value), author.value, read.value === "read" ? "read" : "not read", item.cover);
            myLibrary = myLibrary.map((item) => item.id === editingId ? editedBook : item);
            saveLibrary(myLibrary);
            rerender();
            form.reset();
            editingId = null;
        }
    });
}
const editBook = (e) => {
    const target = e.target;
    const bookEl = target.closest(".book");
    if (!bookEl)
        return;
    editingId = bookEl.id;
    formContainer === null || formContainer === void 0 ? void 0 : formContainer.classList.toggle("hide");
    if (!form)
        return;
    const { title, pages, author, read } = form.elements;
    const item = myLibrary.find((item) => item.id === editingId);
    if (!item)
        return;
    title.value = item.title;
    pages.value = item.page.toString();
    author.value = item.author;
    read.value = item.reading;
};
form === null || form === void 0 ? void 0 : form.addEventListener("submit", addBook);
const button = document.querySelector(".add");
const formContainer = document.querySelector(".libraryform");
if (button) {
    button.addEventListener("click", () => {
        formContainer === null || formContainer === void 0 ? void 0 : formContainer.classList.toggle("hide");
    });
}
else {
    console.error("No button selected!");
}
function rerender() {
    if (!container)
        return;
    container.innerHTML = "";
    myLibrary.forEach(renderBook);
    if (myLibrary.length === 0) {
        const msg = document.createElement("p");
        msg.classList.add("empty-state");
        msg.textContent = "Your library is empty. Add a book to get started.";
        container.appendChild(msg);
    }
}
container === null || container === void 0 ? void 0 : container.addEventListener("click", (e) => {
    const target = e.target;
    const bookEl = target.closest(".book");
    if (target.classList.contains("deleteBook")) {
        deleteBook(bookEl.id);
        rerender();
    }
    else if (target.classList.contains("toggleRead")) {
        toggleRead(bookEl.id);
        rerender();
    }
    else if (target.classList.contains("editBtn")) {
        editBook(e);
    }
});
const theme = (_a = localStorage.getItem("theme")) !== null && _a !== void 0 ? _a : "light";
document.body.setAttribute("data-theme", theme);
const themeBtn = document.querySelector(".theme-toggle");
if (themeBtn)
    themeBtn.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
themeBtn === null || themeBtn === void 0 ? void 0 : themeBtn.addEventListener("click", (e) => {
    const current = document.body.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    themeBtn.textContent = next === "dark" ? "Light Mode" : "Dark Mode";
});
