import "./style.css";
import FetchApi from "./fetchApi/fetchApi.js";
import RenderCards from "./renderCards/renderCards.js";

document.querySelector("#app").innerHTML = `
<header>
<h1>Rick and Morty - Characters</h1>
<button data-js="dataButton">Get Data!</button>

</header>
<main>
<section data-js="tagFilter">
<form data-js="filter-form" aria-labeledby="form-heading" hidden>
  <fieldset>
    <legend id="form-heading">Filter characters by status:</legend>
    <input
      name="tag-filter"
      value="all"
      class="tag-input"
      id="tag-all"
      type="radio"
      checked
    />
    <label class="tag-label" for="tag-all">all</label>
    <input
      name="tag-filter"
      value="Alive"
      class="tag-input"
      id="tag-alive"
      type="radio"
    />
    <label class="tag-label" for="tag-alive">alive</label>
    <input
      name="tag-filter"
      value="Dead"
      class="tag-input"
      id="dead"
      type="radio"
    />
    <label class="tag-label" for="dead">dead</label>
    <input
      name="tag-filter"
      value="unknown"
      class="tag-input"
      id="dunno"
      type="radio"
    />
    <label class="tag-label" for="dunno">dunno</label>
  </fieldset>
</form>
</section>

<section data-js="cardsContainer">
<ul
  aria-live="polite"
  aria-atomic="true"
  aria-relevant="additions"
  role="list"
  class="card-list"
  data-js="cards"
></ul>
</section>
</main>

`;

const cardsContainer = document.querySelector("[data-js=cards]");
const dataButton = document.querySelector("[data-js=dataButton]");
const filterForm = document.querySelector("[data-js=filter-form]");

const url = "https://rickandmortyapi.com/api/character";
const pageUrls = [url];
let currentFilter = "all";

dataButton.addEventListener("click", (event) => {
  event.preventDefault();
  showData();
});

function showData() {
  let allCards = [];
  FetchApi(url)
    .then((data) => {
      let pages = data.info.pages;
      let i = 2;

      while (i <= pages) {
        const nextPage = url + "?page=" + i;
        pageUrls.push(nextPage);
        i++;
      }

      return pageUrls;
    })
    .then((pageArray) => {
      pageArray.forEach((page) => {
        FetchApi(page)
          .then((pageData) => {
            pageData.results.forEach((character) => {
              allCards.push(character);
            });
            return allCards;
          })
          .then((allCharacters) => {
            RenderCards(allCharacters, cardsContainer, currentFilter);
          });
      });
    });

  filterForm.removeAttribute("hidden");

  filterForm.addEventListener("change", () => {
    currentFilter = filterForm.elements["tag-filter"].value;
    RenderCards(allCards, cardsContainer, currentFilter);
  });
}
