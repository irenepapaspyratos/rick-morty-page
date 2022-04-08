const url = "https://rickandmortyapi.com/api/character";

export async function fetchApi(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const output = data;
        return output;
    } catch (error) {
        console.error(`Upps das war ein Fehler: ${error}`);
        const output = null;
        return output;
    }
}
image: datenvonApi.image,
    name: datenvonApi.name,
    status: datenvonApi.status,

    const data = fetchApi();

const filterForm = document.querySelector("[data-js=filter-form]");
const cardsContainer = document.querySelector("[data-js=cards]");
const form = document.querySelector("[data-js=form]");

let currentFilter = "all";

let cards = [datenvonApi];

form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderCards(data.results);

    filterForm.addEventListener("change", () => {
        currentFilter = filterForm.elements["tag-filter"].value;
        renderCards();
    });
});

function renderCards(cards) {
    cardsContainer.ariaBusy = "true";
    cardsContainer.innerHTML = "";
    cards
        .filter(
            (card) =>
            card.status === currentFilter ||
            currentFilter === "all"

        )
        .forEach((card) => {
            const cardElement = document.createElement("li");
            cardElement.className = "card";
            cardElement.innerHTML = `
	
	  <img class = "${card.status === "Alive" ? borderGreen: card.status === "Dead"? borderRed: borderGrey}"
	  
	  src="${datenvonApi.image}" alt="image of ${datenvonApi.image}">
      <h1>${datenvonApi.name}</h1>

      
    `;
            cardsContainer.append(cardElement);
        });
    cardsContainer.ariaBusy = "false";
}