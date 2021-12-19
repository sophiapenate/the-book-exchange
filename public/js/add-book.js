async function getAuthorId(first_name, last_name) {
  // fetch author from database
  const response = await fetch(
    `/api/authors/search?first_name=${first_name}&last_name=${last_name}`
  );
  return response.json().then((data) => {
    // if author already exists in db, return id
    if (data.length > 0) {
      return data[0].id;
      // else, create author then return new author's id
    } else {
      const createAuthorResponse = await fetch("/api/authors", {
        method: "POST",
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (createAuthorResponse.ok) {
        createAuthorResponse.json().then((data) => {
          return data.id;
        });
      }
    }
  });
}

async function addBookFormHandler(e) {
  e.preventDefault();

  // get author id from user input first and last name
  const author_first_name = document
    .querySelector("#author_first_name_input")
    .value.trim();
  const author_last_name = document
    .querySelector("#author_last_name_input")
    .value.trim();
    // check if author first and last names are not blank
  const author_id = await getAuthorId(author_first_name, author_last_name);


  // get user inputs
  const title = document.querySelector("#title_input").value.trim();

  // const genre_id =
  // const is_paperback =
  // const condition =
  // const description =
  // const is_available =
}

document
  .querySelector(".add-book-form")
  .addEventListener("submit", addBookFormHandler);
