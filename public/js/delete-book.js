async function deleteBookBtnHandler(e) {
    // check if delete book button was clicked
  if (e.target.matches(".delete-book")) {
    // get book data
    const book_id = e.target.getAttribute("data-book-id");
    
    const deleteBookResponse = await fetch(`/api/books/${book_id}`, {
        method: 'DELETE',
    });

    if (deleteBookResponse.ok) {
        document.location.reload();
    } else {
        alert(deleteBookResponse.statusText);
    }
  }
}

document.querySelector('#books-ive-traded-list').addEventListener("click", deleteBookBtnHandler)