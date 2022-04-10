export default async function FetchApi(apiUrl) {
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
