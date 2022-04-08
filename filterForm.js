const filterForm = document.querySelector("[data-js=filter-form]");
const cardsContainer = document.querySelector("[data-js=cards]");
const form = document.querySelector("[data-js=form]");

let currentFilter = "all";

let cards = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newCard = {
    question: questionElement.value,
    answer: answerElement.value,
    tags: tagsElement.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length),
  };

  cards = [vonApi];
  renderCards();

  filterForm.addEventListener("change", () => {
    currentFilter = filterForm.elements["tag-filter"].value;
    renderCards();
  });

  form.reset();
  // this moves the focus and is considered bad practice:
  // questionElement.focus();
});
