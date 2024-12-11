import React from "react";
import FilterCharacters from "./components/FilterCharacters";

async function fetchCharacters() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();
  return data.results;
}

const CharactersPage = async () => {
  const characters = await fetchCharacters();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">
        Rick ve Morty Karakterleri
      </h1>
      <FilterCharacters characters={characters} />
    </div>
  );
};

export default CharactersPage;
