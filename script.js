"use strict";

const addItemBtn = document.querySelector(".add-item-btn");
const addItemModal = document.querySelector(".add-item-modal");
const exitModalBtn = document.querySelector(".exit-modal");

const addAuthor = document.querySelector(".add-author");
const addTitle = document.querySelector(".add-title");
const addPages = document.querySelector(".add-pages");

let readingStatusBtns = document.querySelectorAll(".reading-status");
const statusRead = document.querySelector(".status-read");
const statusNotRead = document.querySelector(".status-not-read");
const statusReading = document.querySelector(".status-reading");
const statusErrorMessage = document.querySelector(".status-error-message");

const submit = document.querySelector(".submit");

const formAddBook = document.querySelector(".form");

const mainContainer = document.querySelector(".main-container");

const createBookContainerDiv = document.createElement("div");
const createBookContainerInnerDiv = document.createElement("div");
const createOverflowContainerDiv = document.createElement("div");

const createBookTitleMarginDiv = document.createElement("div");
const createBookAuthorMarginDiv = document.createElement("div");
const createBookPagesMarginDiv = document.createElement("div");

const createBookTitleH2 = document.createElement("h2");
const createBookAuthorP = document.createElement("p");
const createBookAuthorTextSpan = document.createElement("span");
const createBookAuthorSpan = document.createElement("span");

const createBookPagesP = document.createElement("p");
const createBookPagesSpan = document.createElement("span");
const createBookPagesTextSpan = document.createElement("span");

const createBookBtnContainer = document.createElement("div");
const createBookEditBtn = document.createElement("button");
const createBookEditBtnSpan = document.createElement("span");
const createBookDeleteBtn = document.createElement("button");
const createBookDeleteBtnSpan = document.createElement("span");

const createBookStatusP = document.createElement("p");

const myLibrary = [];
let readingStatusSelected;

function Book(author, title, pages, readingStatus) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.readingStatus = readingStatus;
}

const addItem = function () {
  addItemBtn.addEventListener("click", () => {
    addItemModal.classList.remove("hide-modal");
    addRemoveStatusBtnActive();
  });
};

const exitModal = function () {
  exitModalBtn.addEventListener("click", () => {
    addItemModal.classList.add("hide-modal");
    addRemoveStatusBtnActive();
    clearFormAddItems();
  });
};

const readingStatus = function () {
  for (let i = 0; i < readingStatusBtns.length; i++) {
    readingStatusBtns[i].addEventListener("click", (e) => {
      if (e.target.matches(".status-read")) {
        readingStatusSelected = statusRead.value;
        statusRead.classList.remove("reading-status");
        statusRead.classList.add("selected-btn");
        addRemoveStatusNotReadBtnActive();
        addRemoveStatusReadingBtnActive();
      } else if (e.target.matches(".status-not-read")) {
        readingStatusSelected = statusNotRead.value;
        statusNotRead.classList.remove("reading-status");
        statusNotRead.classList.add("selected-btn");
        addRemoveStatusReadBtnActive();
        addRemoveStatusReadingBtnActive();
      } else if (e.target.matches(".status-reading")) {
        readingStatusSelected = statusReading.value;
        statusReading.classList.remove("reading-status");
        statusReading.classList.add("selected-btn");
        addRemoveStatusReadBtnActive();
        addRemoveStatusNotReadBtnActive();
      }
    });
  }
};

function addRemoveStatusReadBtnActive() {
  statusRead.classList.add("reading-status");
  statusRead.classList.remove("selected-btn");
  statusErrorMessage.classList.add("hide-status-error-message");
}

function addRemoveStatusNotReadBtnActive() {
  statusNotRead.classList.add("reading-status");
  statusNotRead.classList.remove("selected-btn");
  statusErrorMessage.classList.add("hide-status-error-message");
}

function addRemoveStatusReadingBtnActive() {
  statusReading.classList.add("reading-status");
  statusReading.classList.remove("selected-btn");
  statusErrorMessage.classList.add("hide-status-error-message");
}

function addRemoveStatusBtnActive() {
  addRemoveStatusReadBtnActive();
  addRemoveStatusNotReadBtnActive();
  addRemoveStatusReadingBtnActive();
}

const submitForm = function () {
  submit.addEventListener("click", (e) => {
    if (
      statusRead.classList.contains("selected-btn") === false &&
      statusNotRead.classList.contains("selected-btn") === false &&
      statusReading.classList.contains("selected-btn") === false
    ) {
      e.preventDefault();
      statusErrorMessage.classList.remove("hide-status-error-message");
    } else {
      addBookToLibrary();
      addItemModal.classList.add("hide-modal");
      addElementsToPage();
      addLibraryToPage();
      clearFormAddItems();
    }
  });
};

function addBookToLibrary() {
  const addBook = new Book(
    addAuthor.value,
    addTitle.value,
    addPages.value,
    readingStatusSelected
  );
  myLibrary.push(addBook);
}

function addLibraryToPage() {
  const bookTitleInput = document.querySelector(".book-title-input");
  const bookAuthorInput = document.querySelector(".book-author-input");
  const bookPagesInput = document.querySelector(".book-pages-input");
  const bookStatusInput = document.querySelector(".book-status-input");
  for (let i = 0; i < myLibrary.length; i++) {
    console.log(`loop number: ${i + 1}`);
    console.log(`myLibrary length: ${myLibrary.length}`);
    console.log(myLibrary);

    for (const [key, value] of Object.entries(myLibrary[i])) {
      if (key === "title") {
        bookTitleInput.textContent = value;
      }
      if (key === "author") {
        bookAuthorInput.textContent = value;
      }
      if (key === "pages") {
        bookPagesInput.textContent = value;
      }
      if (key === "readingStatus") {
        bookStatusInput.textContent = value;
      }
    }
  }
}

function preventPageReload() {
  formAddBook.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}

function clearFormAddItems() {
  if (addItemModal.classList.contains("hide-modal")) {
    addTitle.value = "";
    addAuthor.value = "";
    addPages.value = 0;
  }
}

function addElementsToPage() {
  console.log(
    `Total count in Main Container: ${mainContainer.childElementCount}`
  );
  console.log(`Total count in myLibrary: ${myLibrary.length}`);
  if (mainContainer.childElementCount < myLibrary.length) {
    console.log("creating new elements");
    if (mainContainer.childElementCount === 0) {
      //title
      mainContainer
        .appendChild(createBookContainerDiv)
        .appendChild(createBookContainerInnerDiv)
        .appendChild(createOverflowContainerDiv)
        .appendChild(createBookTitleMarginDiv)
        .appendChild(createBookTitleH2);
      //author
      createOverflowContainerDiv
        .appendChild(createBookAuthorMarginDiv)
        .appendChild(createBookAuthorP)
        .appendChild(createBookAuthorTextSpan);
      createBookAuthorP.appendChild(createBookAuthorSpan);
      //pages
      createOverflowContainerDiv
        .appendChild(createBookPagesMarginDiv)
        .appendChild(createBookPagesP)
        .appendChild(createBookPagesSpan);
      createBookPagesP.appendChild(createBookPagesTextSpan);
      //btn
      createBookContainerDiv
        .appendChild(createBookBtnContainer)
        .appendChild(createBookEditBtn)
        .appendChild(createBookEditBtnSpan);
      createBookBtnContainer
        .appendChild(createBookDeleteBtn)
        .appendChild(createBookDeleteBtnSpan);
      createBookContainerDiv.appendChild(createBookStatusP);
      addClassesToCreatedElements();
    } else {
      //this will probably end up in its own function or I can do an if statement to check if an element is already there and if so I can clone it and if not I'll use the below to create it.
      console.log(mainContainer.firstElementChild);
      const node = mainContainer.firstElementChild;
      const clone = node.cloneNode(true);
      mainContainer.appendChild(clone);
    }
  }
  console.log(
    `Total count in Main Container after loop: ${mainContainer.childElementCount}`
  );
}

function addClassesToCreatedElements() {
  createBookContainerDiv.classList.add("book-container");
  createBookContainerInnerDiv.classList.add("book-container-inner");
  createOverflowContainerDiv.classList.add("overflow-container");

  createBookTitleMarginDiv.classList.add("book-item-margin");
  createBookAuthorMarginDiv.classList.add("book-item-margin");
  createBookPagesMarginDiv.classList.add("book-item-margin");

  createBookTitleH2.classList.add(
    "book-title",
    "book-content",
    "book-title-input"
  );
  createBookAuthorP.classList.add("book-author", "book-content");
  createBookAuthorTextSpan.textContent = "by ";
  createBookAuthorSpan.classList.add("book-author-input");
  createBookPagesP.classList.add("book-pages", "book-content");
  createBookPagesSpan.classList.add("book-pages-input");
  createBookPagesTextSpan.textContent = " pages";

  createBookBtnContainer.classList.add("btn-container");
  createBookEditBtn.classList.add("btn", "btn-edit", "btn-style");
  createBookEditBtn.setAttribute("type", "button");
  createBookEditBtnSpan.classList.add("edit", "icon");

  createBookDeleteBtn.classList.add("btn", "btn-delete", "btn-style");
  createBookDeleteBtn.setAttribute("type", "button");
  createBookDeleteBtnSpan.classList.add("delete", "icon");

  createBookStatusP.classList.add(
    "book-status",
    "book-content",
    "book-status-input"
  );
}

const run = function () {
  addItem();
  exitModal();
  readingStatus();
  submitForm();
  preventPageReload();
};

run();
