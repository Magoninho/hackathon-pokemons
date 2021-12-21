function printJson(json) {
	document.body.innerHTML += JSON.stringify(json);
}

function printmsg(msg) {
	document.body.innerHTML += msg + "<br>";
}

function renderPokemon(sprites, name, types) {
	let div = document.createElement("div");
	div.classList.add('pokemon_info');

	let pokemonNameElem = document.createElement("p");
	let image = document.createElement("img");

	image.src = `${sprites.other.dream_world.front_default}`;

	div.appendChild(image);

	pokemonNameElem.innerHTML += `Nome: ${name}<br>`;

	// adding types
	firstTypeName = types[0].type.name
	div.classList.add(`pokemon_${firstTypeName}`);
	types.forEach(type => {
		pokemonNameElem.innerHTML += `Tipo: ${type.type.name}<br>`;
	})


	div.appendChild(pokemonNameElem);

	// appending div

	document.getElementById("pokemons").appendChild(div);
}

async function getPokemons(from, to) {
	const URL = `https://pokeapi.co/api/v2/pokemon?offset=${from}&limit=${to}`;
	const response = await fetch(URL);
	const data = await response.json();
	const results = data.results;
	let pokemons = [];

	results.forEach(pokemon => {
		pokemons.push(pokemon);
	})

	return pokemons;
}

async function generatePokemons() {
	const pokemons = await getPokemons(0, 500);

	for (let p = 0; p < pokemons.length; p++) {
		const pokemonResp = await fetch(pokemons[p].url);
		const pokemonData = await pokemonResp.json();

		renderPokemon(pokemonData.sprites, pokemonData.name, pokemonData.types);
	}
}


let input = document.getElementById("search_pokemon");
let btn = document.getElementById("search_button");

generatePokemons();


