const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const websiteFolderEl = document.getElementById("folder");
const bookmarksContainer1 = document.getElementById("bookmarks-container1");
const bookmarksContainer2 = document.getElementById("bookmarks-container2");
const bookmarksContainer3 = document.getElementById("bookmarks-container3");
const bookmarksContainer4 = document.getElementById("bookmarks-container4");
const bookmarksContainer5 = document.getElementById("bookmarks-container5");

let socialBookmarks = {};
let blogBookmarks = {};
let toolBookmarks = {};
let devBookmarks = {};
let courseBookmarks = {};

// Show Modal, Focus on Input
function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);
window.addEventListener("click", (e) =>
  e.target === modal ? modal.classList.remove("show-modal") : false
);

// Validate Form
function validate(nameValue, urlValue) {
  const expression =
    /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert("Please submit values for both fields.");
    return false;
  }
  if (!urlValue.match(regex)) {
    alert("Please provide a valid web address.");
    return false;
  }
  // Valid
  return true;
}

// Build Bookmarks
function buildBookmarks(bookmarksContainer, bookmarks) {
  // Remove all bookmark elements
  bookmarksContainer.textContent = "";
  // Build items
  Object.keys(bookmarks).forEach((id) => {
    const { name, url } = bookmarks[id];

    // Item
    const item = document.createElement("div");
    item.classList.add("item");
    // Close Icon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute(
      "onclick",
      `deleteBookmark('${(bookmarksContainer, bookmarks, id)}')`
    );
    // Favicon / Link Container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    // Favicon
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "Favicon");
    // Link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    // Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

// Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage if available
  if (localStorage.getItem("socialBookmarks")) {
    socialBookmarks = JSON.parse(localStorage.getItem("socialBookmarks"));
    buildBookmarks(bookmarksContainer1, socialBookmarks);
  }
  if (localStorage.getItem("toolBookmarks")) {
    toolBookmarks = JSON.parse(localStorage.getItem("toolBookmarks"));
    buildBookmarks(bookmarksContainer2, toolBookmarks);
  }
  if (localStorage.getItem("devBookmarks")) {
    devBookmarks = JSON.parse(localStorage.getItem("devBookmarks"));
    buildBookmarks(bookmarksContainer3, devBookmarks);
  }
  if (localStorage.getItem("blogBookmarks")) {
    blogBookmarks = JSON.parse(localStorage.getItem("blogBookmarks"));
    buildBookmarks(bookmarksContainer4, blogBookmarks);
  }
  if (localStorage.getItem("courseBookmarks")) {
    courseBookmarks = JSON.parse(localStorage.getItem("courseBookmarks"));
    buildBookmarks(bookmarksContainer5, courseBookmarks);
  }
}

// Delete Bookmark
function deleteBookmark(bookmarksContainer, bookmarks, id) {
  // Loop through the bookmarks array

  if (bookmarks[id]) {
    delete bookmarks[id];
  }
  // Update bookmarks array in localStorage, re-populate DOM

  if (bookmarksContainer === "") {
    socialBookmarks[urlValue] = bookmark;
    // Set bookmarks in localStorage, fetch, reset input fields
    localStorage.setItem("socialBookmarks", JSON.stringify(socialBookmarks));
  }
  if (bookmarksContainer === "blog") {
    blogBookmarks[urlValue] = bookmark;
    localStorage.setItem("blogBookmarks", JSON.stringify(blogBookmarks));
  }
  if (bookmarksContainer === "dev") {
    devBookmarks[urlValue] = bookmark;
    localStorage.setItem("devBookmarks", JSON.stringify(devBookmarks));
  }
  if (bookmarksContainer === "tool") {
    toolBookmarks[urlValue] = bookmark;
    localStorage.setItem("toolBookmarks", JSON.stringify(toolBookmarks));
  }
  if (bookmarksContainer === "course") {
    courseBookmarks[urlValue] = bookmark;
    localStorage.setItem("courseBookmarks", JSON.stringify(courseBookmarks));
  }
  localStorage.setItem(bookmarks, JSON.stringify(bookmarks));
  fetchBookmarks();
}

function storeBookmark(e) {
  e.preventDefault();

  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  let containerValue = websiteFolderEl.value;

  if (!urlValue.includes("http://", "https://")) {
    urlValue = `https://${urlValue}`;
  }
  // Validate
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  // Set bookmark object, add to array
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };

  if (containerValue === "social") {
    socialBookmarks[urlValue] = bookmark;
    // Set bookmarks in localStorage, fetch, reset input fields
    localStorage.setItem("socialBookmarks", JSON.stringify(socialBookmarks));
  }
  if (containerValue === "blog") {
    blogBookmarks[urlValue] = bookmark;
    localStorage.setItem("blogBookmarks", JSON.stringify(blogBookmarks));
  }
  if (containerValue === "dev") {
    devBookmarks[urlValue] = bookmark;
    localStorage.setItem("devBookmarks", JSON.stringify(devBookmarks));
  }
  if (containerValue === "tool") {
    toolBookmarks[urlValue] = bookmark;
    localStorage.setItem("toolBookmarks", JSON.stringify(toolBookmarks));
  }
  if (containerValue === "course") {
    courseBookmarks[urlValue] = bookmark;
    localStorage.setItem("courseBookmarks", JSON.stringify(courseBookmarks));
  }

  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// Event Listener
bookmarkForm.addEventListener("submit", storeBookmark);

// On Load, Fetch Bookmarks
fetchBookmarks();
