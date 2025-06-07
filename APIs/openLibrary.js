function onError(params) {
  console.log("Error fetching data:", params);
}

fetch("/hw1/APIs/openLibrary.php").then(onResponse).then(onJson).catch(onError);

function onJson(json) {
  const books = json.docs;
  let num_results = json.num_found;
  if (num_results > 24) {
    num_results = 24;
  }
  const sourcesList = document.querySelector(".sources-list");
  const sourcesListDropdown = document.querySelector("#sources-dropdown");
  for (let i = 0; i < num_results; i++) {
    const book = books[i];
    const title = book.title;
    const author = book.author_name ? book.author_name[0] : "Unknown Author";
    const coverId = book.cover_i ? book.cover_i : "No Cover";
    const coverUrl =
      coverId !== "No Cover"
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
        : "No Cover";

    const bookItem = document.createElement("a");
    bookItem.classList.add("book-item");

    const bookCover = document.createElement("div");
    bookCover.classList.add("book-cover-container");

    const img = document.createElement("img");
    img.src = coverUrl === "No Cover" ? "/hw1/images/map.png" : coverUrl;
    img.alt = `Cover of ${title}`;
    img.classList.add("book-cover");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("book-title");
    titleDiv.textContent = `${title}`;

    bookCover.appendChild(img);
    bookItem.appendChild(bookCover);
    bookItem.appendChild(titleDiv);

    sourcesList.appendChild(bookItem);

    const dropdownItem = document.createElement("a");
    dropdownItem.classList.add("dropdown-item");
    dropdownItem.textContent = title;

    sourcesListDropdown.appendChild(dropdownItem);
  }
}
