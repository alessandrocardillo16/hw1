function onResponse(response) {
  return response.json();
}

function onJson(data) {
  const container = document.querySelector("#search-results");
  container.innerHTML = "";
  if (data.docs.length === 0) {
    container.innerHTML = "<p>No results found.</p>";
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

    const infoDiv = document.createElement("div");
    infoDiv.className = "search-result-info";

    const titleDiv = document.createElement("div");
    titleDiv.className = "search-result-title";
    titleDiv.textContent = book.title;
    infoDiv.appendChild(titleDiv);

    bookDiv.appendChild(infoDiv);
    container.appendChild(bookDiv);
  }
}

const query = document.querySelector(".search-input").value;
if (!query) {
  console.log("Please enter a search term.");
}
fetch(
  "https://openlibrary.org/search.json?author=Wizards+RPG+Team&title=" +
    encodeURIComponent(query)
)
  .then(onResponse)
  .then(onJson);
