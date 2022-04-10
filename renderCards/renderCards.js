export default function RenderCards(cards, container, chosenFilter) {
	container.ariaBusy = "true";
	container.innerHTML = "";

	cards
		.filter((card) => card.status === chosenFilter || chosenFilter === "all")
		.forEach((card) => {
			const cardElement = document.createElement("li");
			cardElement.className = "card";
			cardElement.innerHTML = `
				<img class = "${
					card.status === "Alive"
						? "borderGreen"
						: card.status === "Dead"
						? "borderRed"
						: "borderGrey"
				}"  
				src="${card.image}" alt="image of ${card.image}">
				<h1>${card.name}</h1>
			`;

			container.append(cardElement);
		});

	container.ariaBusy = "false";
}
