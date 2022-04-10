const url = "https://rickandmortyapi.com/api/character";

export async function fetchApi(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const output = data.results;
    return output;
  } catch (error) {
    console.error(`Upps das war ein Fehler: ${error}`);
    const output = null;
    return output;
  }
}

const dataButton = document.querySelector("button");
const filterForm = document.querySelector("[data-js=filter-form]");
const container = document.querySelector("[data-js=cardsContainer]");
let filter = "all";

filterForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Damit Formular nicht bei jedem Click abgeschickt wird
  fetchApi(url).then((result) => renderRickMorty(result));
  // fetchApi-function wird aufgerufen --> daten kommen als promise --> .then löst promise auf >> funktion renderRickMorty wird mit promise-Daten aufgerufen
  filterForm.addEventListener("change", () => {
    filter = filterForm.elements["tag-filter"].value;
  });
});

// die gespeicherten Daten von renderRickMorty speichere ich im Cards-Parameter
function renderRickMorty(cards) {
  container.innerHTML = ""; // ich leere meinen Container
  let filtered = []; // leeres Array initialisieren
  //
  filtered = cards.filter((card) => card.status === filter || filter === "all");
  filtered.forEach((card) => {
    // jede Karte wird gefiltert
    const listElement = document.createElement("li"); // neues li-element erzeugen
    const image = document.createElement("img"); // neues img-element erzeugen
    image.src = card.image; // img-element benennen
    image.classList.add(
      // img-element eine klasse vergeben => in einer if--else function
      card.status === "Alive" //wenn status 'Alive' dann 'grün'
        ? "borderGreen"
        : card.status === "Dead" // wenn status 'Dead' dann 'rot'
        ? "borderRed"
        : "borderBlue" // wenn was 'anderes' dann 'blau'
    );
    listElement.textContent = card.name; // li-element benennen
    container.appendChild(image);
    container.appendChild(listElement); // li/img-element zu Conainer hinzufügen
  });
}
/* 
getCardStatus(card)
function getCardStatus(card) {
  let status;
  if (card.status === "Alive") {
    status = "borderGreen";
  }
  if (card.status === "Dead") {
    status = "borderRed";
  } else {
    status = "borderBlue";
  }
  return status;
}
 */
