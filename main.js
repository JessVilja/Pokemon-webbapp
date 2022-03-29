export const morePokemonInfo = async (pokeItemResult) => {
    // Showing the pokemon name
    document
      .getElementById("pokemonModal")
      .getElementsByClassName(
        "modal-title"
      )[0].innerHTML = `${pokeItemResult.name}`;
  
    // Showing the pokemon height
    document
      .getElementById("pokemonModal")
      .getElementsByClassName(
        "modal-body"
      )[0].innerHTML = `Height: ${pokeItemResult.height}`;
  
    // Showing the pokemon weight
    document
      .getElementById("pokemonModal")
      .getElementsByClassName(
        "modal-body"
      )[0].innerHTML += `<br>Weight: ${pokeItemResult.weight}`;
  
  
    // You don't need to keep appending the modal HTML code, as you will be having duplicated #pokemonModal.
    // I added the modal code in HTML, so whenever the User clicks on More Info, only the info will be changed.
  };
  