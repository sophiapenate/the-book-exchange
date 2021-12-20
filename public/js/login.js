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
      alert.log(response.statusText);
    }
  }
}

document.querySelector(".login-form").addEventListener("click", login);
