createCards();

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

  return card;
}

function createCards() {
  const container = document.querySelector(".home-card-group.container");

  if (!container) {
    console.error("Container per le home card non trovato.");
    return;
  }
  container.innerHTML = "";
  for (let index = 0; index < homeSectionItems.cards.length; index++) {
    const cardData = homeSectionItems.cards[index];
    const cardElement = document.createElement("a");
    cardElement.className =
      index === 0
        ? "home-card home-card-a"
        : `home-card home-card-secondary home-card-${String.fromCharCode(
            98 + index - 1
          )}`;
    cardElement.href = cardData.href;
    const imgElement = document.createElement("img");
    imgElement.className = "home-card-background";
    imgElement.src = cardData.imgSrc;
    imgElement.alt = cardData.title;
    cardElement.appendChild(imgElement);

    if (index === 0) {
      const titleElement = document.createElement("h1");
      titleElement.className = "home-card-title";
      titleElement.textContent = cardData.title;

      const buttonElement = document.createElement("div");
      buttonElement.className =
        "contained-button contained-button-red home-card-button";
      buttonElement.textContent = "Bundle & Save";

      cardElement.appendChild(titleElement);
      cardElement.appendChild(buttonElement);
    } else {
      const titleElement = document.createElement("h2");
      titleElement.className = "home-card-secondary-title";
      titleElement.textContent = cardData.title;

      cardElement.appendChild(titleElement);
    }

    container.appendChild(cardElement);
  }
}

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

let articlesOffset = 0;
const articlesLimit = 8;

function onResponse(response) {
  return response.json();
}

function onJson(data) {
  console.log(data);

  var topContainer = document.querySelector(".content-card-container");
  var parsedData = [];
  for (var i = 0; i < data.articles.length; i++) {
    var item = data.articles[i];
    var newDate = formatPublishDate(item.publishDate);
    var newItem = Object.assign({}, item, { publishDate: newDate });
    parsedData = parsedData.concat([newItem]);
  }

  if (parsedData.length > 0 && !appendGlobal) {
    var homeBody = document.querySelector(".home-body.container");
    if (homeBody) {
      homeBody.innerHTML = "";

      var articleDiv = document.createElement("div");
      articleDiv.className = "home-body-article";

      var titleA = document.createElement("a");
      titleA.className = "article-title";
      titleA.href = "/hw1/pages/article/article.php?id=" + parsedData[0].id;
      titleA.textContent = parsedData[0].title || "";

      var extrasDiv = document.createElement("div");
      extrasDiv.className = "home-body-article-extras";

      var dateSpan = document.createElement("span");
      dateSpan.className = "article-publish-date";
      dateSpan.textContent = parsedData[0].publishDate || "";

      var byText = document.createTextNode(" by ");

      var authorSpan = document.createElement("span");
      authorSpan.className = "article-author";
      authorSpan.textContent = parsedData[0].author || "";

      extrasDiv.appendChild(dateSpan);
      extrasDiv.appendChild(byText);
      extrasDiv.appendChild(authorSpan);

      var descDiv = document.createElement("div");
      descDiv.className = "article-description";
      descDiv.textContent = parsedData[0].description || "";

      var moreA = document.createElement("a");
      moreA.className = "article-more";
      moreA.href = "/hw1/pages/article/article.php?id=" + parsedData[0].id;
      moreA.textContent = "read more";

      articleDiv.appendChild(titleA);
      articleDiv.appendChild(extrasDiv);
      articleDiv.appendChild(descDiv);
      articleDiv.appendChild(moreA);

      var likesContainer = document.createElement("div");
      likesContainer.className = "content-card-likes";
      var likes = document.createElement("div");
      likes.className = "article-likes";
      likes.textContent = " " + (parsedData[0].likes_count || 0);
      likesContainer.appendChild(likes);

      var likesIcon = document.createElement("img");
      likesIcon.className = "article-likes-icon";
      likesIcon.src = "/hw1/icons/heart_empty.svg";
      likesIcon.style.cursor = "pointer";

      fetch("/hw1/APIs/check_like.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "article_id=" + encodeURIComponent(parsedData[0].id),
      })
        .then(onResponse)
        .then(onJsonLike);

      likesIcon.addEventListener("click", function () {
        addLike(parsedData[0].id, likes, likesIcon);
      });

      likesContainer.appendChild(likesIcon);
      articleDiv.appendChild(likesContainer);

      var imageDiv = document.createElement("div");
      imageDiv.className = "home-body-image";
      if (parsedData[0].imgSrc) {
        var img = document.createElement("img");
        img.src = parsedData[0].imgSrc;
        img.alt = "";
        img.className = "home-body-img";
        imageDiv.appendChild(img);
      }

      homeBody.appendChild(articleDiv);
      homeBody.appendChild(imageDiv);
    }
  }

  if (!appendGlobal) {
    topContainer.innerHTML = "";

    var firstCardsContainer = document.createElement("div");
    firstCardsContainer.className = "top-cards-container";

    for (var i = 1; i < Math.min(3, parsedData.length); i++) {
      var item = parsedData[i];
      var newCard = createContentCard(item);
      firstCardsContainer.appendChild(newCard);
    }

    topContainer.appendChild(firstCardsContainer);

    for (var i = 3; i < parsedData.length; i++) {
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

function onJsonLike(data) {
  const likesIcon = document.querySelector(".article-likes-icon");
  if (data.liked) {
    likesIcon.src = "/hw1/icons/heart_full.svg";
    likesIcon.classList.add("liked");
  } else {
    likesIcon.src = "/hw1/icons/heart_empty.svg";
    likesIcon.classList.remove("liked");
  }
}

var appendGlobal = false;

function loadArticles(offset, append) {
  appendGlobal = append;
  fetch("/hw1/APIs/articles.php?offset=" + offset + "&limit=" + articlesLimit)
    .then(onResponse)
    .then(onJson)
    .catch(onError);
}

loadArticles(0, false);

document.querySelector(".see-more").addEventListener("click", function (e) {
  e.preventDefault();
  loadArticles(articlesOffset, true);
});

function addLike(articleId, likesElement, likesIcon) {
  fetch("/hw1/APIs/like_article.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "article_id=" + encodeURIComponent(articleId),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Like response:", data);
      if (!data.success && !data.authenticated) {
        window.location.href = "/hw1/pages/login/login.php";
      }

      if (data.success && data.likes_count !== undefined) {
        likesElement.textContent = " " + data.likes_count;
        if (data.liked) {
          likesIcon.src = "/hw1/icons/heart_full.svg";
          likesIcon.classList.add("liked");
        } else {
          likesIcon.src = "/hw1/icons/heart_empty.svg";
        }
      }
    })
    .catch(onError);
}

function onError(error) {
  console.error("Errore:", error);
}
