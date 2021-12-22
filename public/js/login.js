let errorMessageUser = document.getElementById('username_input');
let errorMessagePassword = document.getElementById('password_input');

async function login(e) {
  e.preventDefault();

  // get user inputs
  const username = document.querySelector("#username_input").value.trim();
  const password = document.querySelector("#password_input").value;

  // check if user provided both username and password
  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      console.log(response.statusText);
      errorMessageUser.setAttribute('class', 'uk-input uk-form-danger')
      errorMessagePassword.setAttribute('class', 'uk-input uk-form-danger')

      console.log(errorMessage)
    }
  }
}

document.querySelector(".login-form").addEventListener("submit", login);
