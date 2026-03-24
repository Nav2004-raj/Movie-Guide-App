const searchForm = document.querySelector("form");

const movieContainer = document.querySelector(".movie-container");

const inputBox = document.querySelector(".inputBox");

// Adding event listener to search form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const movieName = inputBox.value.trim();

  if (movieName !== "") {
    showErrorMessage("Fetching Movie Information");

    getMovieInfo(movieName);
  } else {
    showErrorMessage("Enter movie name to get movie information");
  }
});

// Function to fetch movie details
const getMovieInfo = async (movie) => {
  try {
    const myApiKey = "6cf72a65";
    const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to fetch movie data.");
    }

    const data = await response.json();

    showMovieData(data);
  } catch (error) {
    showErrorMessage("No movie found!!!");
  }
};

// Function Movie details on screen
const showMovieData = (data) => {
  movieContainer.innerHTML = "";
  movieContainer.classList.remove("noBackground");

  // Use Destructuring assignment to extract properties from data object.
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } =
    data;

  const movieElement = document.createElement("div");
  movieElement.classList.add("movie-info");

  movieElement.innerHTML = `
    <h2>${Title}</h2>
    <p> <strong>Rating: </strong>&#11088 ${imdbRating} </p>
    `;

  const movieGenre = document.createElement("div");
  movieGenre.classList.add("movie-genre");

  Genre.split(",").forEach((element) => {
    const p = document.createElement("p");
    p.innerHTML = element;
    movieGenre.appendChild(p);
  });

  movieElement.appendChild(movieGenre);

  movieElement.innerHTML += `
  <p> <strong>Realesed date: </strong>${Released}</p>
  <p> <strong>Duration: </strong>${Runtime}</p>
  <p> <strong>Cast: </strong>${Actors}</p>
  <p> <strong>Plot: </strong>${Plot}</p>
  `;

  //Creating a div for movie poster
  const moviePoster = document.createElement("div");
  moviePoster.classList.add("movie-poster");

  moviePoster.innerHTML = `
  <img src="${Poster}"/>
  `;

  movieContainer.appendChild(moviePoster);

  movieContainer.appendChild(movieElement);
};

// Function to display error message
const showErrorMessage = (message) => {
  movieContainer.innerHTML = `
    <h2>${message}</h2>
    `;
  movieContainer.classList.add("noBackground");
};
