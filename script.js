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

const submit = document.querySelector(".submit");

const myLibrary = [];

function Book() {}

function addBookToLibrary() {}

const addItem = function () {
  addItemBtn.addEventListener("click", () => {
    console.log("Open Add Item Modal");
    addItemModal.classList.remove("hide-modal");

    statusRead.classList.add("reading-status");
    statusRead.classList.remove("selected-btn");

    statusNotRead.classList.add("reading-status");
    statusNotRead.classList.remove("selected-btn");

    statusReading.classList.add("reading-status");
    statusReading.classList.remove("selected-btn");
  });
};

const exitModal = function () {
  exitModalBtn.addEventListener("click", () => {
    console.log("Close Modal");
    addItemModal.classList.add("hide-modal");

    statusRead.classList.add("reading-status");
    statusRead.classList.remove("selected-btn");

    statusNotRead.classList.add("reading-status");
    statusNotRead.classList.remove("selected-btn");

    statusReading.classList.add("reading-status");
    statusReading.classList.remove("selected-btn");
  });
};

const readingStatus = function () {
  for (let i = 0; i < readingStatusBtns.length; i++) {
    readingStatusBtns[i].addEventListener("click", (e) => {
      if (e.target.matches(".status-read")) {
        statusRead.classList.remove("reading-status");
        statusRead.classList.add("selected-btn");

        statusNotRead.classList.add("reading-status");
        statusNotRead.classList.remove("selected-btn");

        statusReading.classList.add("reading-status");
        statusReading.classList.remove("selected-btn");
      } else if (e.target.matches(".status-not-read")) {
        statusNotRead.classList.remove("reading-status");
        statusNotRead.classList.add("selected-btn");

        statusRead.classList.add("reading-status");
        statusRead.classList.remove("selected-btn");

        statusReading.classList.add("reading-status");
        statusReading.classList.remove("selected-btn");
      } else if (e.target.matches(".status-reading")) {
        statusReading.classList.remove("reading-status");
        statusReading.classList.add("selected-btn");

        statusRead.classList.add("reading-status");
        statusRead.classList.remove("selected-btn");

        statusNotRead.classList.add("reading-status");
        statusNotRead.classList.remove("selected-btn");
      }
    });
  }
};

const run = function () {
  addItem();
  exitModal();
  readingStatus();
};

run();
