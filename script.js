"use strict";

// Create selectors for add item button and show modal on page when clicked
const addItemBtn = document.querySelector(".add-item-btn");
const addItemModal = document.querySelector(".add-item-modal");
const addAuthor = document.querySelector(".add-author");
const addTitle = document.querySelector(".add-title");
const addPages = document.querySelector(".add-pages");
const addStatus = document.getElementById("reading-status");
const addEditBook = document.querySelector(".add-edit-book");

const addItem = function () {
  addItemBtn.addEventListener("click", () => {
    console.log("opening modal");
    addItemModal.classList.remove("hide-modal");
    addEditBook.textContent = "Add";
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
const submit = document.querySelector(".submit");
const submitBtnContainer = document.querySelector(".submit-btn-container");
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
                            <h2 class="book-title book-content book-title-input" id="book-title-id-${i}">${addTitle.value}</h2>
                          </div>
                        
                          <div class="book-item-margin">
                            <p class="book-author book-content">
                              by <span class="book-author-input" id="book-author-id-${i}">${addAuthor.value}</span>
                            </p>
                          </div>
                        
                          <div class="book-item-margin">
                            <p class="book-pages book-content">
                              <span class="book-pages-input" id="book-pages-id-${i}">${addPages.value}</span> pages
                            </p>
                          </div>
                        </div>
                      </div>
                        
                      <div class="btn-container">
                        <button type="button" class="btn btn-edit btn-style" id="edit-item-${i}">
                          <span class="edit icon"></span>
                        </button>
                      
                        <button type="button" class="btn btn-delete btn-style" id="remove-item-${i}">
                          <span class="delete icon"></span>
                        </button>
                      </div>
                      
                      <p class="book-status book-content book-status-input" id="book-status-id-${i}">${addStatus.value}</p>
                    </div>`;

  mainContainer.insertAdjacentHTML("beforeend", html);

  addBookToLibrary();
  console.log(myLibrary);

  console.log("closing modal");
  addItemModal.classList.add("hide-modal");
  clearFormAddItems();

  // Remove elements from page and item from array
  let removeItemBtn = document.getElementById("remove-item-" + i);
  console.log(removeItemBtn);
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

  // Edit book
  // get id of edit btn
  let editItemBtn = document.getElementById("edit-item-" + i);
  console.log(editItemBtn);

  // get ids of input items
  let bookTitleInput = document.getElementById("book-title-id-" + i);
  let bookAuthorInput = document.getElementById("book-author-id-" + i);
  let bookPagesInput = document.getElementById("book-pages-id-" + i);
  let bookStatusInput = document.getElementById("book-status-id-" + i);
  console.log(bookTitleInput.textContent);
  console.log(bookAuthorInput.textContent);
  console.log(bookPagesInput.textContent);
  console.log(bookStatusInput.textContent);

  editItemBtn.addEventListener("click", () => {
    //open modal and hide submit button and unhide edit submit button
    console.log("opening modal");
    addItemModal.classList.remove("hide-modal");
    submit.classList.add("hide-submit-btn");
    addEditBook.textContent = "Edit";
    const clickEditBtn = document.querySelector(".submit-edit-btn");
    clickEditBtn.classList.remove("hide-submit-btn");

    // set modal inputs to existing inputs on selected item
    addTitle.value = bookTitleInput.textContent;
    addAuthor.value = bookAuthorInput.textContent;
    addPages.value = bookPagesInput.textContent;
    addStatus.value = bookStatusInput.textContent;

    clickEditBtn.addEventListener(
      "click",
      (e) => {
        e.preventDefault();

        // update element content to updated modal inputs
        bookTitleInput.textContent = addTitle.value;
        bookAuthorInput.textContent = addAuthor.value;
        bookPagesInput.textContent = addPages.value;
        bookStatusInput.textContent = addStatus.value;

        // Close modal, unhide submit button, hide edit submit button
        console.log("closing modal");
        addItemModal.classList.add("hide-modal");
        clearFormAddItems();
        submit.classList.remove("hide-submit-btn");
        clickEditBtn.classList.add("hide-submit-btn");
      },
      // Runs once
      { once: true }
    );
  });

  console.log(i);
  i++;
  console.log(i);
}

// Submit items
function clickSubmit() {
  submit.addEventListener("click", submitForm);
}

const runLibrary = function () {
  addItem();
  exitModal();
  clickSubmit();
};

runLibrary();
