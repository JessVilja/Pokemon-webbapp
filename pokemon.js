import { morePokemonInfo } from "./main.js";

// fetch all pokemons
export const getPokemon = async () => {
  const url = new URL(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0`);
  const res = await fetch(url);
  const pokemon = await res.json();

  return pokemon;
};

export const getSinglePokemon = async (url) => {
  const pokeItem = await fetch(url);
  const pokeItemResult = await pokeItem.json();

  return pokeItemResult;
};

export const getSpeciesData = async (id) => {
  const speciesURL = new URL("https://pokeapi.co");
  speciesURL.pathname = `/api/v2/pokemon-species/${id}`;
  const resSpecies = await fetch(speciesURL);
  const species = await resSpecies.json();
  console.log(species);
  return species;
};

// display (list) pokemons
export const displayPokemon = async (pokemon) => {
  for (let i = 0; i < pokemon.results.length; i++) {
    const pokeItem = await fetch(pokemon.results[i].url);
    const pokeItemResult = await pokeItem.json();
    const divcontainer = document.querySelector(".pokemon-container");

    /* I added an extra attribute "data-pokemon-api", so when the user clicks on the
     * "more info" button, the url will be taken and fetch data from this pokemon
     * instead of calling the getPokemon API againn */

    const html = `  <div class="card pokemon-card" style="width: 18rem">
        <img src="${
          pokeItemResult.sprites.other.dream_world.front_default
        }" class="card-img-top pokemon-img" alt="..." />
        <div class="card-body">
          <h5 class="card-title pokemon-name">${pokeItemResult.name.toUpperCase()}</h5>
          <p class="card-text pokemon-type">
            ${pokeItemResult.base_experience} kr
          </p>
          <!-- Button to Open the Modal -->
          <button
            type="button"
            class="btn btn-dark info-button"
            data-bs-toggle="modal"
            data-bs-target="#pokemonModal"
            data-pokemon-api="${pokemon.results[i].url}"
          >
            More Info
          </button>
          
          </div>
  
      </div>
      `;
    divcontainer.insertAdjacentHTML("beforeend", html);
  }
};

// Display pokemon info

// The following funciton will be called when the user clicks on the "More Info" button to fetch new info.

(async () => {
  async function moreInfo(e) {
    var target = e.target;

    if (target.className.match(/info-button/)) {
      let pokemonUrl = target.getAttribute("data-pokemon-api");

      let pokeItemResult = await getSinglePokemon(pokemonUrl);

      morePokemonInfo(pokeItemResult);
    }
  }

  const pokemon = await getPokemon();

  displayPokemon(pokemon);

  document.body.addEventListener("click", moreInfo, false);
})();
