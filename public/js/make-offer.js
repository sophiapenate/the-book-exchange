async function offerFormHandler(e) {
  e.preventDefault();

  // get user input
  const offer_text = document.querySelector('#offer_input').value.trim();
  const book_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (offer_text) {
    const response = await fetch("/api/offers", {
      method: "POST",
      body: JSON.stringify({ offer_text, book_id }),
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.status);
    }
  }
}

document
  .querySelector(".offer-form")
  .addEventListener("submit", offerFormHandler);
