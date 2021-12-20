function searchFormHandler(e) {
  e.preventDefault();

  // get user input and format for query string
  const query = document
    .querySelector("#header-search-input")
    .value.trim()
    .replaceAll(" ", "+");

  // load search page with results
  document.location.replace(`/search?q=${query}`);
}

document
  .querySelector("#header-search-form")
  .addEventListener("submit", searchFormHandler);
