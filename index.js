const pokemonList = document.getElementById("pokemon-list");
const pokemonDetails = document.getElementById("pokemon-details");
const pokemonInfo = document.getElementById("pokemon-info");

async function fetchPokemonList() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const data = await response.json();

    data.results.forEach(pokemon => {
      const pokemonId = getPokemonIdFromUrl(pokemon.url);
      const listItem = document.createElement("li");
      listItem.textContent = `${pokemonId}. ${pokemon.name}`;
      listItem.addEventListener("click", () => fetchPokemonData(pokemon.url));
      pokemonList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
  }
}

function getPokemonIdFromUrl(url) {
    // The Pokemon URL is in the format: https://pokeapi.co/api/v2/pokemon/{pokemon-id}/
    // Extract the Pokemon ID from the URL.
    const idRegex = /\/pokemon\/(\d+)\//;
    const match = url.match(idRegex);
    return match ? match[1] : "N/A";
}

async function fetchPokemonData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const { id, name, types, height, weight , sprites } = data;
    console.log(data);
    const spriteFrontUrl = sprites.front_default;
    const pokemonDetailsHTML = `
      <img src="${spriteFrontUrl}" alt="Sprite frontal del Pokémon">
      <p><strong>ID:</strong> ${id}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Type(s):</strong> ${types.map(type => type.type.name).join(", ")}</p>
      <p><strong>Height:</strong> ${height}</p>
      <p><strong>Weight:</strong> ${weight}</p>
    `;

    pokemonInfo.innerHTML = pokemonDetailsHTML;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
  }
}

fetchPokemonList();
