"use strict";

// Create selectors for add item button and show modal on page when clicked
const addItemBtn = document.querySelector(".add-item-btn");
const addItemModal = document.querySelector(".add-item-modal");
const addAuthor = document.querySelector(".add-author");
const addTitle = document.querySelector(".add-title");
const addPages = document.querySelector(".add-pages");
const addStatus = document.getElementById("reading-status");

const addItem = function () {
  addItemBtn.addEventListener("click", () => {
    console.log("opening modal");
    addItemModal.classList.remove("hide-modal");
  });
};

// Create selector for closing modal and hiding it, and clearing all form items within when closed
const exitModalBtn = document.querySelector(".exit-modal");

const exitModal = function () {
  exitModalBtn.addEventListener("click", () => {
    console.log("closing modal");
    addItemModal.classList.add("hide-modal");
    clearFormAddItems();
  });
};

// Define empty library array and create constructor function
const myLibrary = [];

function Book(author, title, pages, readingStatus, innerIndex) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.readingStatus = readingStatus;
  this.innerIndex = innerIndex;
}

// Create selectors for relevant form elements to add to library array and create function to construct new object and add to library
function addBookToLibrary() {
  const addBook = new Book(
    addAuthor.value,
    addTitle.value,
    addPages.value,
    addStatus.value,
    i
  );
  myLibrary.push(addBook);
}

// Clear form items when closing modal
function clearFormAddItems() {
  if (addItemModal.classList.contains("hide-modal")) {
    addTitle.value = "";
    addAuthor.value = "";
    addPages.value = 0;
    addStatus.value = "Read";
  }
}

// Create html elements to put on page and add book to html when modal is submitted
const mainContainer = document.querySelector(".main-container");
const statusBtnSelected = document.querySelector(".btn-selected");
let i = 0;

// Add elements to page and items to array
function submitForm() {
  console.log("Submit button as been clicked");
  let html = `<div class="book-container">
                  <div class="book-container-inner">
                    <div class="overflow-container">
                      <div class="book-item-margin">
                        <h2 class="book-title book-content book-title-input">${addTitle.value}</h2>
                      </div>
                    
                      <div class="book-item-margin">
                        <p class="book-author book-content">
                          by <span class="book-author-input">${addAuthor.value}</span>
                        </p>
                      </div>
                    
                      <div class="book-item-margin">
                        <p class="book-pages book-content">
                          <span class="book-pages-input">${addPages.value}</span> pages
                        </p>
                      </div>
                    </div>
                  </div>
                    
                  <div class="btn-container">
                    <button type="button" class="btn btn-edit btn-style">
                      <span class="edit icon"></span>
                    </button>
                  
                    <button type="button" class="btn btn-delete btn-style" id=remove-item-${i}>
                      <span class="delete icon"></span>
                    </button>
                  </div>
                  
                  <p class="book-status book-content book-status-input">${addStatus.value}</p>
                </div>`;

  mainContainer.insertAdjacentHTML("beforeend", html);

  addBookToLibrary();
  console.log(myLibrary);

  console.log("closing modal");
  addItemModal.classList.add("hide-modal");
  clearFormAddItems();

  // Remove elements from page and item from array
  let removeItemBtn = document.getElementById("remove-item-" + i);
  removeItemBtn.addEventListener("click", () => {
    let removeItem = removeItemBtn.parentNode.parentNode;
    mainContainer.removeChild(removeItem);

    for (let i = 0; i < myLibrary.length; i++) {
      for (const [key, value] of Object.entries(myLibrary[i])) {
        if (
          key === "innerIndex" &&
          value.toString() === removeItemBtn.id.slice(12)
        ) {
          myLibrary.splice(myLibrary[i], 1);
          console.log(myLibrary);
        }
      }
    }
  });

  i++;
}

function clickSubmit() {
  const submit = document.querySelector(".submit");
  submit.addEventListener("click", submitForm);
}

const runLibrary = function () {
  addItem();
  exitModal();
  clickSubmit();
};

runLibrary();
