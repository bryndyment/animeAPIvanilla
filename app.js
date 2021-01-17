const API_URL = "https://api.jikan.moe/v3/top/anime/1/bypopularity";
 const main = document.getElementById("main");
 const form = document.getElementById("form");
 const search_query = document.getElementById("search");

/* initial loading/main page */

 getAnimes(API_URL);

async function getAnimes(url) {
  const res = await fetch(url);
  const data = await res.json();

  showAnimes(data.top.slice(0, 16));
}

function showAnimes(animes){
  main.innerHTML = "";

  animes.forEach((anime) => {
     const { title, image_url, url } = anime

     const animeEl = document.createElement("div");
     animeEl.classList.add("anime");

     animeEl.innerHTML = `
            <img src="${image_url}" alt="${title}">
            <div class="anime-info">
              <a href=${url} target="_blank"><h3>${title}</h3></a>
            </div>
        `;
     main.appendChild(animeEl);
  })
} 


/* Form */

const SEARCH_API = `https://api.jikan.moe/v3/search/anime?q=${search_query.value}&order_by=title&sort=asc&limit=15`;
    
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search_query.value;

  if (searchTerm && searchTerm !== "") {
    getAnimes(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});
