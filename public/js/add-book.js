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
  const author_id = await getAuthorId(author_first_name, author_last_name);

  // get remaining user inputs
  const title = document.querySelector("#title_input").value.trim();
  const genre_id = document.querySelector("#genre_selection").value;
  const is_paperback = document.querySelector("#format_selection").value;
  const condition = document.querySelector("#condition_selection").value;
  const description = document.querySelector("#description_input").value;

  // validate inputs 
  if(typeof author_first_name != 'string' 
  || author_first_name.length < 2 ){
        alert('First name must be a valid string with a minimum of 2 characters')
  }else if(is_paperback != "1" && is_paperback != "0"){
    alert("Paperback selection is invalid");
  }else {
    // create book object
    const bookObj = {
      title,
      author_id,
      genre_id,
      is_paperback,
      condition,
      is_available: 1,
    };
    if (description !== "") {
      bookObj.description = description;
    }

    // check if user filled out all required fields
    if (title && author_id && genre_id && is_paperback && condition) {
      const createBookResponse = await fetch("/api/books", {
          method: "POST",
          body: JSON.stringify(bookObj),
          headers: { "Content-Type": "application/json" },
        });

        if (createBookResponse.ok) {
          createBookResponse.json().then((bookData) => {
            document.location.replace('/book/' + bookData.id);
          });
        } else {
          createBookResponse.json().then((data) => {
            console.log(data.errors[0].message);
          });
        }
    }
  }
}

document
  .querySelector(".add-book-form")
  .addEventListener("submit", addBookFormHandler);
