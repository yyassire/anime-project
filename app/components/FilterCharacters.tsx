"use client";

import React, { ChangeEvent, useEffect, useState } from "react";

type CustomObject = {
  name: string;
  url: string;
};

interface Character {
  id: number;
  name: string;
  status: string;
  gender: string;
  image: string;
  location: CustomObject;
  origin: CustomObject;
}

const FilterCharacters = ({ characters }: { characters: Character[] }) => {
  const [filteredCharacters, setFilteredCharacters] = useState(characters);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<string>("");
  const handleFilter = () => {
    const filtered = characters.filter((character) => {
      const matchesStatus = statusFilter
        ? character.status === statusFilter
        : true;
      const matchesGender = genderFilter
        ? character.gender === genderFilter
        : true;
      return matchesStatus && matchesGender;
    });
    setFilteredCharacters(filtered);
  };
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };
  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGenderFilter(e.target.value);
  };
  useEffect(() => {
    handleFilter(); // Apply filter when status or gender changes
  }, [statusFilter, genderFilter]);

  return (
    <div>
      <div className="flex space-x-4 mt-4 justify-center">
        <select
          onChange={handleStatusChange}
          value={statusFilter}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          onChange={handleGenderChange}
          value={genderFilter}
          className="border p-2 rounded"
        >
          <option value="">All Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {filteredCharacters.map((character) => (
          <div
            key={character.id}
            className="border p-2 rounded shadow  overflow-hidden transform transition-all duration-500 hover:scale-105 hover:z-10 hover:shadow-2xl"
          >
            <img src={character.image} alt={character.name} />
            {/* content */}
            <h2 className="font-semibold">{character.name}</h2>
            <div className="flex gap-2 text-[15px] text-gray-500 items-center">
              <div
                className={
                  character.status == "Alive"
                    ? "w-[10px] h-[10px] bg-green-800 rounded-full"
                    : "bg-red-800 w-[10px] h-[10px] rounded-full"
                }
              ></div>
              <span>
                {character.status} - {character.gender}
              </span>
            </div>
            <div className="flex gap-1 text-[13px] text-gray-500">
              <span>Last known location:</span>
              <span>{character.location.name}</span>
            </div>
            <div className="flex gap-1 text-[13px] text-gray-500 mt-2">
              <span>First seen in:</span>
              <span>{character.origin.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCharacters;
