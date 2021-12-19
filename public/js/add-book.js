async function getAuthorId(first_name, last_name) {
  let author_id;

  // search db for existing author
  const dbSearchResponse = await fetch(
    `/api/authors/search?first_name=${first_name}&last_name=${last_name}`
  ).then((response) => {
    return response.json();
  });

  // if author exists, get id from db
  if (dbSearchResponse.length > 0) {
    author_id = dbSearchResponse[0].id;
  }
  // else, create author then get new author's id
  else {
    const createAuthorResponse = await fetch("/api/authors", {
      method: "POST",
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (createAuthorResponse.ok) {
      author_id = await createAuthorResponse.json().then((data) => {
        return data.id;
      });
    } else {
      console.log(response.statusText);
    }
  }

  return author_id;
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
  console.log(author_id);

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
