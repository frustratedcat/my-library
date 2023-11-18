"use strict";

// Create selectors for add item button and show modal on page when clicked
const addItemBtn = document.querySelector(".add-item-btn");
const addItemModal = document.querySelector(".add-item-modal");
const addAuthor = document.querySelector(".add-author");
const addTitle = document.querySelector(".add-title");
const addPages = document.querySelector(".add-pages");
const addStatus = document.getElementById("reading-status");
const addEditBook = document.querySelector(".add-edit-book");
const exitModalBtn = document.querySelector(".exit-modal");
const clickEditBtn = document.querySelector(".submit-edit-btn");

const addItem = function () {
  addItemBtn.addEventListener("click", () => {
    addItemModal.classList.remove("hide-modal");
    addEditBook.textContent = "Add";
    exitModalBtn.classList.remove("hide-exit-btn");
  });
};

// Exit modal
const exitModal = function () {
  exitModalBtn.addEventListener("click", () => {
    addItemModal.classList.add("hide-modal");
    clearFormAddItems();
    clickEditBtn.classList.add("hide-submit-btn");
    submit.classList.remove("hide-submit-btn");
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

// Submit items
function clickSubmit() {
  submit.addEventListener("click", () => {
    addTitle.value = addTitle.value.trim();
    addAuthor.value = addAuthor.value.trim();
    addPages.value = addPages.value.trim();

    if (
      addTitle.value === "" ||
      addTitle.value === null ||
      addAuthor.value === "" ||
      addAuthor.value === null ||
      addPages.value === "" ||
      addPages.value === null ||
      addPages.value < 0
    ) {
    } else {
      submitForm();
    }
  });
}

// Create html elements to put on page and add book to html when modal is submitted
const submit = document.querySelector(".submit");
const submitBtnContainer = document.querySelector(".submit-btn-container");
const mainContainer = document.querySelector(".main-container");
const statusBtnSelected = document.querySelector(".btn-selected");
let i = 0;

// Add elements to page and items to array
function submitForm() {
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
          myLibrary.splice(i, 1);
        }
      }
    }
  });

  // Edit book
  // get id of edit btn
  let editItemBtn = document.getElementById("edit-item-" + i);

  // get ids of input items
  let bookTitleInput = document.getElementById("book-title-id-" + i);
  let bookAuthorInput = document.getElementById("book-author-id-" + i);
  let bookPagesInput = document.getElementById("book-pages-id-" + i);
  let bookStatusInput = document.getElementById("book-status-id-" + i);

  editItemBtn.addEventListener("click", () => {
    //open modal and hide submit button and unhide edit submit button
    addItemModal.classList.remove("hide-modal");
    submit.classList.add("hide-submit-btn");
    addEditBook.textContent = "Edit";
    clickEditBtn.classList.remove("hide-submit-btn");
    exitModalBtn.classList.add("hide-exit-btn");

    // set modal inputs to existing inputs on selected item
    addTitle.value = bookTitleInput.textContent;
    addAuthor.value = bookAuthorInput.textContent;
    addPages.value = bookPagesInput.textContent;
    addStatus.value = bookStatusInput.textContent;

    clickEditBtn.addEventListener(
      "click",
      () => {
        // update element content to updated modal inputs
        addTitle.value = addTitle.value.trim();
        addAuthor.value = addAuthor.value.trim();
        addPages.value = addPages.value.trim();

        // Delete book if empty inputs exist
        if (
          addTitle.value === "" ||
          addAuthor.value === "" ||
          addPages.value === ""
        ) {
          console.log("removing edited item");
          let deleteEditItem = editItemBtn.parentNode.parentNode;
          console.log(deleteEditItem);
          mainContainer.removeChild(deleteEditItem);

          console.log(myLibrary);

          for (let i = 0; i < myLibrary.length; i++) {
            console.log(myLibrary.length);
            console.log(`outer loop number ${i}`);

            for (const [key, value] of Object.entries(myLibrary[i])) {
              console.log(key, value);

              if (
                key === "innerIndex" &&
                value.toString() === editItemBtn.id.slice(10)
              ) {
                console.log(`${key}: ${value} - ${editItemBtn.id.slice(10)}`);
                let indexToDelete = value;
                console.log(indexToDelete);

                let deletedItemThing = myLibrary[i];
                console.log(deletedItemThing);
                console.log(i);
                myLibrary.splice(i, 1);
              }
            }
          }
          console.log(myLibrary);
        } else {
          bookTitleInput.textContent = addTitle.value;
          bookAuthorInput.textContent = addAuthor.value;
          bookPagesInput.textContent = addPages.value;
          bookStatusInput.textContent = addStatus.value;

          // Update array to updated modal inputs
          for (let i = 0; i < myLibrary.length; i++) {
            for (const [key, value] of Object.entries(myLibrary[i])) {
              if (
                key === "innerIndex" &&
                value.toString() === editItemBtn.id.slice(10)
              ) {
                myLibrary[i].title = addTitle.value;
                myLibrary[i].author = addAuthor.value;
                myLibrary[i].pages = addPages.value;
                myLibrary[i].readingStatus = addStatus.value;
              }
            }
          }
        }

        // Close modal, unhide submit button, hide edit submit button
        addItemModal.classList.add("hide-modal");
        clearFormAddItems();
        clickEditBtn.classList.add("hide-submit-btn");
        submit.classList.remove("hide-submit-btn");
      },
      // Runs once and then unbinds until button is clicked again
      { once: true }
    );
  });

  i++;
}

const runLibrary = function () {
  addItem();
  exitModal();
  clickSubmit();
};

runLibrary();
