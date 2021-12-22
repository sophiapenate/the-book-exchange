const first_nameEl = document.querySelector("#first_name_input");
const last_nameEl = document.querySelector("#last_name_input");
const emailEl = document.querySelector("#email_input");
const phoneEl = document.querySelector("#phone_input");
const usernameEl = document.querySelector("#username_input");
const passwordEl = document.querySelector("#password_input");
const rentered_passwordEl = document.querySelector("#renter_password_input");

async function signupFormHandler(e) {
  e.preventDefault();

  // get user inputs
  const first_name = document.querySelector("#first_name_input").value.trim();
  const last_name = document.querySelector("#last_name_input").value.trim();
  const email = document.querySelector("#email_input").value.trim();
  const phone = document.querySelector("#phone_input").value.trim();
  const favorite_genre_id = document.querySelector(
    "#favorite_genre_selection"
  ).value;
  const username = document.querySelector("#username_input").value;
  const password = document.querySelector("#password_input").value;
  const rentered_password = document.querySelector(
    "#renter_password_input"
  ).value;

  // create user object
  let userObj;
  if (favorite_genre_id === "") {
    userObj = {
      first_name,
      last_name,
      email,
      phone,
      username,
      password,
    };
  } else {
    userObj = {
      first_name,
      last_name,
      email,
      phone,
      favorite_genre_id,
      username,
      password,
    };
  }

  // check if user included all required fields and matching passwords
  if (
    first_name &&
    last_name &&
    email &&
    username &&
    password &&
    password === rentered_password
  ) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
      console.log(response)
    } else {
      response.json().then((data) => {
        console.log(data.errors[0].message);
      });
    }
  }

  if (!first_name) {
    console.log("Please enter your first name.");
    first_nameEl.setAttribute("class", "")
  }

  if (!last_name) {
    console.log("Please enter your last name.");
  }

  if (!email) {
    console.log("Please enter your email address.");
  }

  if (!username) {
    console.log("Please choose a username.");
  }

  if (!password) {
    console.log("Please choose a password.");
  }

  if (!rentered_password) {
    console.log("Please re-enter your password.");

  }

  if (password !== rentered_password) {
    console.log("Your passwords don't match. Please try again.");
    
  }
}

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
