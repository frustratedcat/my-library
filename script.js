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
      console.log(myLibrary);
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

const run = function () {
  addItem();
  exitModal();
  readingStatus();
  submitForm();
};

run();
