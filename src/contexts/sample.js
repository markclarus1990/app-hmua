// Original book object
const book = {
  title: "Abby Lost in the Forest",
  author: "Elora",
  pages: 25,
};

// Updating the book title and pages using the spread operator
const updatedBook = {
  ...book, // Copy all existing properties
  title: "Abby and the Enchanted Forest", // Modify the title
  pages: 30, // Modify the pages
};

console.log(updatedBook);
