const { Book } = require("../models");

const bookData = [
  {
    "title": "Ender's Game",
    "author_id": 1,
    "genre_id": 2,
    "is_paperback": 1,
    "condition": "Good",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"is_available": 1,
		"user_id": 2
  },
  {
    "title": "The Tipping Point",
    "author_id": 2,
    "genre_id": 9,
    "is_paperback": 0,
    "condition": "Like New",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"is_available": 1,
		"user_id": 1
  },
  {
    "title": "Into The Wild",
    "author_id": 3,
    "genre_id": 10,
    "is_paperback": 1,
    "condition": "Well-loved",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"is_available": 1,
		"user_id": 4
  },
  {
    "title": "The Great Gatsby",
    "author_id": 4,
    "genre_id": 1,
    "is_paperback": 1,
    "condition": "Good",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"is_available": 1,
		"user_id": 3
  },
  {
    "title": "The Immortal Life of Henrietta Lacks",
    "author_id": 5,
    "genre_id": 10,
    "is_paperback": 0,
    "condition": "Good",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"is_available": 1,
		"user_id": 1
  },
  {
    "title": "The Catcher In The Rye",
    "author_id": 6,
    "genre_id": 1,
    "is_paperback": 1,
    "condition": "Well-loved",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"is_available": 1,
		"user_id": 2
  },
];

const seedBooks = () => Book.bulkCreate(bookData);

module.exports = seedBooks;
