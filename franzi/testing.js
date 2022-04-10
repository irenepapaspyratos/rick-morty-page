const url = "https://rickandmortyapi.com/api/character";

export async function fetchApi(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const output = data.results;
    filterCards(output);
  } catch (error) {
    console.error(`Upps das war ein Fehler: ${error}`);
    const output = null;
    return output;
  }
}

const dataButton = document.querySelector("button");
const filterForm = document.querySelector("[data-js=filter-form]");

filterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  fetchApi(url);
  filterForm.addEventListener("change", () => {
    let Filter = filterForm.elements["tag-filter"].value;
  });
});

function renderRickMorty(cards) {
  const unList = document.createElement("ul");
  document.body.append(unList);

  cards.forEach((data) => {
    const listElement = document.createElement("li");
    const image = document.createElement("img");
    image.src = data.image;
    listElement.textContent = data.name;
    unList.appendChild(image);
    unList.appendChild(listElement);
  });
}

function filterCards(cards) {
  let currentFilter = "all";
  filterForm.addEventListener("change", () => {
    let Filter = filterForm.elements["tag-filter"].value;
    currentFilter = Filter;
  });
  let filteredCards = cards.filter(
    (card) => card.status === currentFilter || currentFilter === "all"
  );
  renderRickMorty(filteredCards);
  console.log(currentFilter);
}
