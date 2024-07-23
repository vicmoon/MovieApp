// public/script.js
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

const BACKEND_URL = "https://mysecondmovieapp.netlify.app/";
// Get movies from the backend server
getMovies(`${BACKEND_URL}/api/movies`);

async function getMovies(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    showMovies(data.results);
  } catch (error) {
    console.error("Error fetching movies:", error);
    main.innerHTML = `<p>Error fetching movies: ${error.message}</p>`;
  }
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}" />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassbyRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
    `;
    main.appendChild(movieElement);
  });
}

function getClassbyRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(`https://your-backend-server.com/api/search?q=${searchTerm}`);
    search.value = "";
  } else {
    window.location.reload();
  }
});
