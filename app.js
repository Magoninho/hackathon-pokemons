
function printJson(json) {
	document.body.innerHTML += JSON.stringify(json);
}

function printmsg(msg) {
	document.body.innerHTML += msg + "<br>";
}

function renderPokemons(pokemons, mainDiv) {

	mainDiv.innerHTML = "";
	for (let p = 0; p < pokemons.length; p++) {
		const pokemon = pokemons[p]; // current pokemon
		let div = document.createElement("div");
		div.classList.add('pokemon_info');

		let pokemonNameElem = document.createElement("p");
		let image = document.createElement("img");



		image.src = `${pokemon.sprites.other.dream_world.front_default}`;

		div.appendChild(image);

		pokemonNameElem.innerHTML += `Nome: ${pokemon.name}<br>`;

		// adding types
		firstTypeName = pokemon.types[0].type.name
		div.style.backgroundColor = `var(--${firstTypeName})`;
		pokemon.types.forEach(type => {
			const typeName = type.type.name;
			pokemonNameElem.innerHTML += `Tipo: ${typeName}<br>`;
		})


		div.appendChild(pokemonNameElem);

		// appending div

		document.getElementById("pokemons").appendChild(div);
	}
}

async function getResults() {
	const URL = "https://pokeapi.co/api/v2/pokemon";
	const response = await fetch(URL);
	const data = await response.json();
	return data;
	
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

async function getPokemonData(offset, limit) {
	const pokemons = await getPokemons(offset, limit);
	let data = [];

	for (let p = 0; p < pokemons.length; p++) {
		const pokemonResp = await fetch(pokemons[p].url);
		const pokemonData = await pokemonResp.json();

		data.push(pokemonData);
		//renderPokemon(pokemonData.sprites, pokemonData.name, pokemonData.types);
	}
	return data;
}

function searchPokemon(regex, pokemonData) {
	let foundPokemons = [];
	for (let p = 0; p < pokemonData.length; p++) {
		const pokemon = pokemonData[p]; // pokemon element
		// searching the pokemon
		if (pokemon.name.match(regex)) {
			// pushing the found pokemons
			foundPokemons.push(pokemon);
		}
	}

	
	return foundPokemons;
}


(async () => {
	
	const LIMIT = 151;
	const myDiv = document.getElementById("pokemons");
	const pokemonData = await getPokemonData(0, LIMIT);
	
	let offset = LIMIT;
	renderPokemons(pokemonData, myDiv);

	let input = document.getElementById("search_pokemon");

	input.addEventListener("input", (async () => {

		// searching pokemons with the input value
		let pokemonSearch = searchPokemon(new RegExp(`^${input.value.trim().toLowerCase()}`), pokemonData);

		renderPokemons(pokemonSearch, myDiv);

	}));

	let btn_more = document.getElementById("btn-more");
	
	
	btn_more.addEventListener("click", (async () => {
		const newPokemonData = await getPokemonData(offset, LIMIT);
		for (let i = 0; i < newPokemonData.length; i++) {
			pokemonData.push(newPokemonData[i]);
		}
		offset += LIMIT;

		const newPokemonSearch = searchPokemon(new RegExp(`^${input.value.trim().toLowerCase()}`), pokemonData);

		renderPokemons(newPokemonSearch, myDiv);
	}));
})();

