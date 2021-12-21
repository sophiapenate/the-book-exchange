async function acceptOfferHandler(e) {
  // check if accept offer button was clicked
  if (e.target.matches(".accept-offer")) {
    // get book and user data
    const book_id = e.target.getAttribute("data-book-id");
    const offer_id = e.target.getAttribute("data-offer-id");
    const user_id = e.target.getAttribute("data-user-id");

    // change book to unavailable in db
    const updateBookResponse = await fetch(`/api/books/${book_id}`, {
      method: "PUT",
      body: JSON.stringify({ is_available: 0 }),
      headers: { "Content-Type": "application/json" },
    });

    if (!updateBookResponse.ok) {
      updateBookResponse.json();
    }

    // change offer to accepted in db
    const updateOfferResponse = await fetch(`/api/offers/accept/${offer_id}`, {
      method: "PUT",
      body: JSON.stringify({ accepted: 1 }),
      headers: { "Content-Type": "application/json" },
    });

    if (!updateOfferResponse.ok) {
      updateOfferResponse.json();
    }

    // send both users email

  
    
    
  }
}

document
  .querySelector("#current-offers")
  .addEventListener("click", acceptOfferHandler);
