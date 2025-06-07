let articlesOffset = 0;
const articlesLimit = 8;

function formatPublishDate(publishDateString) {
  const now = new Date();
  const date = new Date(publishDateString);

  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() === date.getDate() &&
    now.getHours() === date.getHours()
  ) {
    return diffMinutes === 1 ? "1 minuto fa" : `${diffMinutes} minuti fa`;
  }

  if (
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() === date.getDate()
  ) {
    return diffHours === 1 ? "1 ora fa" : `${diffHours} ore fa`;
  }

  if (diffDays < 7) {
    return diffDays === 1 ? "1 giorno fa" : `${diffDays} giorni fa`;
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function createContentCard(item) {
  const card = document.createElement("div");
  card.className = "content-card";
  card.dataset.articleId = item.id || "";

  const preview = document.createElement("div");
  preview.className = "content-card-preview";
  const img = document.createElement("img");
  img.className = "content-card-image";
  img.src = item.imgSrc || "";
  img.alt = "";
  preview.appendChild(img);

  const contentContainer = document.createElement("div");
  contentContainer.className = "content-container";

  const title = document.createElement("a");
  title.className = "content-card-title";
  title.href = "/hw1/pages/article/article.php?id=" + item.id;
  title.textContent = item.title || "Article Title Placeholder";
  contentContainer.appendChild(title);

  const meta = document.createElement("div");
  meta.className = "content-card-meta";
  const dateSpan = document.createElement("span");
  dateSpan.className = "article-publish-date";
  dateSpan.textContent = item.publishDate || "3 days ago";
  const byText = document.createTextNode(" by ");
  const authorSpan = document.createElement("span");
  authorSpan.className = "article-author";
  authorSpan.textContent = item.author || "Utente";
  meta.appendChild(dateSpan);
  meta.appendChild(byText);
  meta.appendChild(authorSpan);
  contentContainer.appendChild(meta);

  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "content-description";
  descriptionDiv.textContent =
    item.description ||
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
  contentContainer.appendChild(descriptionDiv);

  const readMore = document.createElement("a");
  readMore.className = "content-more";
  readMore.href = title.href = "/hw1/pages/article/article.php?id=" + item.id;
  readMore.textContent = "Read More";
  contentContainer.appendChild(readMore);

  const likesContainer = document.createElement("div");
  likesContainer.className = "content-card-likes";
  const likes = document.createElement("div");
  likes.className = "article-likes";
  likes.textContent = ` ${item.likes_count || 0}`;
  likesContainer.appendChild(likes);

  const likesIcon = document.createElement("img");
  likesIcon.className = "article-likes-icon";
  likesIcon.src = "/hw1/icons/heart_empty.svg";
  likesIcon.style.cursor = "pointer";

  fetch("/hw1/APIs/check_like.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `article_id=${encodeURIComponent(item.id)}`,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.liked) {
        likesIcon.src = "/hw1/icons/heart_full.svg";
        likesIcon.classList.add("liked");
      } else {
        likesIcon.src = "/hw1/icons/heart_empty.svg";
        likesIcon.classList.remove("liked");
      }
    });

  likesIcon.addEventListener("click", function () {
    addLike(item.id, likes, likesIcon);
  });

  likesContainer.appendChild(likesIcon);
  contentContainer.appendChild(likesContainer);

  card.appendChild(preview);
  card.appendChild(contentContainer);

  console.log(card);

  return card;
}

function onResponse(response) {
  return response.json();
}

function onJson(data) {
  console.log(data);

  const topContainer = document.querySelector(".content-card-container");
  let parsedData = [];
  for (var i = 0; i < data.articles.length; i++) {
    var item = data.articles[i];
    var newDate = formatPublishDate(item.publishDate);
    var newItem = {
      ...item,
      publishDate: newDate,
    };
    parsedData = parsedData.concat(newItem);
  }

  if (!window._appendArticles) {
    topContainer.innerHTML = "";

    for (var i = 0; i < parsedData.length; i++) {
      var item = parsedData[i];
      var newCard = createContentCard(item);
      topContainer.appendChild(newCard);
    }
  } else {
    for (var i = 1; i < parsedData.length; i++) {
      var item = parsedData[i];
      var newCard = createContentCard(item);
      if (topContainer) {
        topContainer.appendChild(newCard);
      }
    }
  }

  articlesOffset += parsedData.length;
  if (parsedData.length < articlesLimit) {
    document.querySelector(".see-more").classList.add("hidden");
  }
}

function onError(error) {
  console.error("Errore durante il recupero degli articoli:", error);
}

function loadArticles(offset, append) {
  window._appendArticles = append;
  fetch(
    "/hw1/APIs/fetch_articles.php?offset=" + offset + "&limit=" + articlesLimit
  )
    .then(onResponse)
    .then(onJson)
    .catch(onError);
}

document.querySelector(".see-more").addEventListener("click", function (e) {
  e.preventDefault();
  loadArticles(articlesOffset, true);
});

loadArticles(0, false);
