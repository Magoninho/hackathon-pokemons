function printJson(json) {
	document.getElementById("poke").innerHTML += JSON.stringify(json)
}

function printmsg(msg) {
	document.getElementById("poke").innerHTML += msg + "<br>";
}

async function getPokemons(from, to) {
	const URL = `https://pokeapi.co/api/v2/pokemon?offset=${from}&limit=${to}`
	const response = await fetch(URL);
	const data = await response.json();
	const results = data.results
	let pokemons = []

	results.forEach(pokemon => {
		pokemons.push(pokemon)
	})

	return pokemons
}

async function generatePokemons() {
	const pokemons = await getPokemons(0, 1000)

	for (let p = 0; p < pokemons.length; p++){
		let image = document.createElement("img")
		const pokemonResp = await fetch(pokemons[p].url)
		const pokemonData = await pokemonResp.json()

		image.src = `${pokemonData.sprites.other.dream_world.front_default}`
		document.getElementById("poke").appendChild(image)
		printmsg(pokemons[p].name)
	}
}

generatePokemons()
