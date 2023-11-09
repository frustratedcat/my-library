"use strict";

const addItemBtn = document.querySelector(".add-item-btn");
const addItemModal = document.querySelector(".add-item-modal");
const exitModalBtn = document.querySelector(".exit-modal");

const myLibrary = [];

function Book() {}

function addBookToLibrary() {}

const addItem = function () {
  addItemBtn.addEventListener("click", () => {
    console.log("Open Add Item Modal");
    addItemModal.classList.remove("hide-modal");
  });
};

const exitModal = function () {
  exitModalBtn.addEventListener("click", () => {
    console.log("Close Modal");
    addItemModal.classList.add("hide-modal");
  });
};

const run = function () {
  addItem();
  exitModal();
};

run();
