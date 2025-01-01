//import "./styles.css";
class Books {
  constructor(title, page, author, reading) {
    this.title = title;
    this.page = page;
    this.author = author;
    this.reading = reading;
    this.info = function () {
      return `${this.title} written by ${this.author}, ${this.page} pages, ${this.reading} `;
    };
  }
}

const myLibrary = [];
function addToMyLibrary(b) {
  myLibrary.push(b);
  return myLibrary;
}

const container = document.querySelector(".container");

function bookItems() {
  for (let i = 0; i < myLibrary.length; i++) {
    let items = myLibrary[i];
    const book = document.createElement("div");
    book.classList.add("book");
    const info = document.createElement("ul");
    info.classList.add("info");

    container.appendChild(book);
    book.appendChild(info);

    let bookInfo = Object.keys(items);
    let bookValue = Object.values(items);
    for (let i = 0; i < bookInfo.length; i++) {
      if (bookInfo[i] === "info") continue;
      const list = document.createElement("li");
      list.textContent = `${bookInfo[i]}: ${bookValue[i]}`;
      if (bookInfo[i] === "page") list.textContent += " pages";
      info.appendChild(list);
    }
  }
}

const bookOne = new Books(
  "Romeo and Juliet",
  144,
  "William Shakespeare",
  "read"
);
const bookTwo = new Books(
  "Harry Potter and the Sorcerer's Stone",
  270,
  "J.K Rowling",
  "not read"
);
const bookThree = new Books(
  "Song of Ice and Fire",
  332,
  "G.R.R Martin",
  "Read"
);
const addBookOne = addToMyLibrary(bookOne);
const addBookTwo = addToMyLibrary(bookTwo);
const addBookThree = addToMyLibrary(bookThree);
bookItems();
const form = document.forms.control;

function addBook() {
  const title = document.getElementById("title").value;
  document.getElementById("title").value = "";
  const pages = form.pages.value;
  form.pages.value = "";
  const author = form.author.value;
  form.author.value = "";
  const read = form.read.value;
  form.read.value = "";
  const setBook = new Books(title, pages, author, read);
  myLibrary.push(setBook);

  let item = myLibrary[myLibrary.length - 1];
  const book = document.createElement("div");
  book.classList.add("book");
  const info = document.createElement("ul");
  info.classList.add("info");

  container.appendChild(book);
  book.appendChild(info);

  let bookInfo = Object.keys(item);
  let bookValue = Object.values(item);
  for (let i = 0; i < bookInfo.length; i++) {
    if (bookInfo[i] === "info") continue;
    const list = document.createElement("li");
    list.textContent = `${bookInfo[i]}: ${bookValue[i]}`;
    if (bookInfo[i] === "page") list.textContent += " pages";
    info.appendChild(list);
  }
}

form.addEventListener("submit", addBook);
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

const button = document.querySelector(".add");
const formContainer = document.querySelector(".libraryform");
button.addEventListener("click", () => {
  if (formContainer.classList.contains("libraryform")) {
    formContainer.classList.toggle("hide");
  }
});
