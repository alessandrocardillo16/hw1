function toggleSidebar() {
  const interactions = document.querySelector(".interactions");
  const modal = document.querySelector(".modal");
  const body = document.querySelector("body");
  if (!isOpen) {
    interactions.classList.add("flex-row");
    modal.classList.add("flex-row");
    body.classList.add("no-scroll");
    window.scrollTo(0, 0);
    isOpen = true;
  } else {
    interactions.classList.remove("flex-row");
    modal.classList.remove("flex-row");
    body.classList.remove("no-scroll");
    isOpen = false;
  }
}

function toggleDropdownButton() {
  const dropdownContent = this.nextElementSibling;
  dropdownContent.classList.toggle("block");
}

let isOpen = false;
const notSidebar = document.querySelector(".not-sidebar");
const onClickBurger = document.querySelector(".burger-menu");
onClickBurger.addEventListener("click", toggleSidebar);
notSidebar.addEventListener("click", toggleSidebar);

const dropdownBtns = document.querySelectorAll(".dropdown-btn");
for (button of dropdownBtns) {
  button.addEventListener("click", toggleDropdownButton);
}

function onJson(data) {
  const collections = document.querySelector(".collections-cards-container");
  const collectionsDropdown = document.querySelector("#collections-dropdown");
  appendDropdownContent(data.collections, collectionsDropdown);
  appendDropdownCards(data.collections, collections);

  const gameRules = document.querySelector(".rules-cards-container");
  const gameRulesDropdown = document.querySelector("#game-rules-dropdown");
  appendDropdownContent(data.gameRules, gameRulesDropdown);
  appendDropdownContent(data.rulesColumn, gameRulesDropdown);
  appendDropdownCards(data.gameRules, gameRules);

  const gameRulesCol = document.querySelector(".rules-column-container");
  appendDropdownCards(data.rulesColumn, gameRulesCol);

  const tools = document.querySelector(".tools-cards-container");
  const toolsDropdown = document.querySelector("#tools-dropdown");

  appendDropdownContent(data.tools, toolsDropdown);
  appendDropdownCards(data.tools, tools);

  const media = document.querySelector(".media-cards-container");
  const mediaDropdown = document.querySelector("#media-dropdown");
  appendDropdownContent(data.media, mediaDropdown);
  appendDropdownCards(data.media, media);
}

function onResponse(response) {
  return response.json();
}

function onError(error) {
  console.log("Error: " + error);
}

fetch("/hw1/pages/headerSections.json")
  .then(onResponse)
  .then(onJson)
  .catch(onError);

function appendDropdownCards(array, container) {
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const card = document.createElement("a");
    card.className = "dropdown-card";
    card.href = item.href;

    const backgroundDiv = document.createElement("div");
    backgroundDiv.className = "dropdown-card-background";

    const img = document.createElement("img");
    img.src = item.image;

    backgroundDiv.appendChild(img);

    const titleDiv = document.createElement("div");
    titleDiv.className = "dropdown-card-title";
    titleDiv.textContent = item.title;

    card.appendChild(backgroundDiv);
    card.appendChild(titleDiv);

    container.appendChild(card);
  }
}

function appendDropdownContent(array, container) {
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const dropdownItem = document.createElement("a");
    dropdownItem.className = "dropdown-item";
    dropdownItem.href = item.href;
    dropdownItem.textContent = item.title;

    container.appendChild(dropdownItem);
  }
}

function onSearchResponse(response) {
  return response.json();
}

function onSearchJson(data) {
  console.log(data);

  let resultsContainer = document.querySelector("#search-results");
  resultsContainer.innerHTML = "";
  if (data.docs.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }
  for (let i = 0; i < data.docs.length; i++) {
    const book = data.docs[i];
    const bookDiv = document.createElement("div");
    bookDiv.className = "search-result-item";

    let cover;
    if (book.cover_i) {
      cover = document.createElement("img");
      cover.className = "search-result-cover";
      cover.src =
        "https://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg";
      cover.alt = "cover";
    } else {
      cover = document.createElement("div");
      cover.className = "search-result-cover";
    }
    bookDiv.appendChild(cover);

    const titleDiv = document.createElement("div");
    titleDiv.className = "search-result-title";
    titleDiv.textContent = book.title;
    bookDiv.appendChild(titleDiv);

    resultsContainer.appendChild(bookDiv);
  }
}

function onSearchSubmit(event) {
  event.preventDefault();
  const input = document.querySelector(".search-input");
  const query = input.value.trim();
  if (!query) return;

  if (window.location.pathname.includes("/search/search.php")) {
    console.log("Searching for: " + query);

    fetch(
      "https://openlibrary.org/search.json?author=Wizards+RPG+Team&title=" +
        encodeURIComponent(query)
    )
      .then(onSearchResponse)
      .then(onSearchJson)
      .catch(function () {
        let resultsContainer = document.querySelector("#search-results");
        resultsContainer.innerHTML = "<p>No results found.</p>";
      });
  } else {
    window.location.href =
      "/hw1/pages/search/search.php?q=" + encodeURIComponent(query);
  }
}

const searchForm = document.querySelector(".search-form");
if (searchForm) {
  searchForm.addEventListener("submit", onSearchSubmit);
}
