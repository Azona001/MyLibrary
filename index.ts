//import "./styles.css";
class Books {
    title: string;
    page: string | number;
    author: string;
    reading: string;
    info: () => string;
    constructor(title: string, page: string, author: string, reading: string) {
      this.title = title;
      this.page = page;
      this.author = author;
      this.reading = reading;
      this.info = function () {
        return `${this.title} written by ${this.author}, ${this.page} pages, ${this.reading} `;
      };
    }
  }
  
  const myLibrary: Books[] = [];
  function addToMyLibrary(b: Books) {
    myLibrary.push(b);
    return myLibrary;
  }
  
  const container: HTMLElement | null = document.querySelector(".container");
  
  function bookItems() {
    for (let i = 0; i < myLibrary.length; i++) {
      let items = myLibrary[i];
      const book = document.createElement("div");
      book.classList.add("book");
      const info = document.createElement("ul");
      info.classList.add("info");
  
      container?.appendChild(book);
      book.appendChild(info);
  
      let bookInfo = Object.keys(items);
      let bookValue: Books[] = Object.values(items);
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
    "144",
    "William Shakespeare",
    "read"
  );
  const bookTwo = new Books(
    "Harry Potter and the Sorcerer's Stone",
    "270",
    "J.K Rowling",
    "not read"
  );
  const bookThree = new Books(
    "Song of Ice and Fire",
    "332",
    "G.R.R Martin",
    "Read"
  );
  const addBookOne = addToMyLibrary(bookOne);
  const addBookTwo = addToMyLibrary(bookTwo);
  const addBookThree = addToMyLibrary(bookThree);
  bookItems();

  interface HTMLFormElement extends HTMLElement{
    title: HTMLInputElement;
    pages: HTMLInputElement;
    author: HTMLInputElement;
    read: HTMLInputElement;
}
  const form = document.forms[0];
  
  function addBook() {
    const title = form.title.value;
    form.title.value = "";
    const pages = form.pages.value;
    form.pages.value = "";
    const author = form.author.value;
    form.author.value = "";
    const read = form.read.value;
    form.read.value = "";
    const setBook: Books = new Books(title, pages, author, read);
    myLibrary.push(setBook);
  
    let item = myLibrary[myLibrary.length - 1];
    const book = document.createElement("div");
    book.classList.add("book");
    const info = document.createElement("ul");
    info.classList.add("info");
  
    container?.appendChild(book);
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
  form.addEventListener("submit", (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  });
  
  const button: HTMLButtonElement | null = document.querySelector(".add");
  const formContainer = document.querySelector(".libraryform");
  if (button) {
  button.addEventListener("click", () => {
    if (formContainer?.classList.contains("libraryform")) {
      formContainer.classList.toggle("hide");
    }
  });
} else{console.error("No button selected!");}