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
