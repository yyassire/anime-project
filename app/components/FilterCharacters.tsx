"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Define the interfaces
interface Info {
  next: string | null;
  prev: string | null;
}

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

const CharactersFilter = ({
  characters,
  info,
  currentPage,
}: {
  characters: Character[];
  info: Info;
  currentPage: string;
}) => {
  const router = useRouter();

  const [statusFilter, setStatusFilter] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<string>("");

  // Handle filter change for status
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    const filterQuery = new URLSearchParams(window.location.search);
    filterQuery.set("status", e.target.value);
    filterQuery.set("page", "1");
    router.push("/?" + filterQuery.toString());
  };

  // Handle filter change for gender
  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenderFilter(e.target.value);
    const filterQuery = new URLSearchParams(window.location.search);
    filterQuery.set("gender", e.target.value);
    filterQuery.set("page", "1");
    router.push("/?" + filterQuery.toString());
  };

  // go to the next page on click
  const handleNextPage = () => {
    const filterQuery = new URLSearchParams(window.location.search);
    filterQuery.set("page", String(Number(currentPage) + 1));
    router.push("/?" + filterQuery.toString());
  };
  // go to the previous page on click
  const handlePreviousPage = () => {
    const filterQuery = new URLSearchParams(window.location.search);
    filterQuery.set("page", String(Number(currentPage) - 1));
    router.push("/?" + filterQuery.toString());
  };

  return (
    <div className="container px-2 md:px-10 ">
      <div className="flex space-x-4 mt-4 justify-center">
        <select
          onChange={handleStatusChange}
          value={statusFilter}
          className="border p-2 rounded"
        >
          <option value="">Tüm Durumlar</option>
          <option value="Alive">Hayatta</option>
          <option value="Dead">Ölü</option>
          <option value="unknown">Bilinmiyor</option>
        </select>
        <select
          onChange={handleGenderChange}
          value={genderFilter}
          className="border p-2 rounded"
        >
          <option value="">Tüm Cinsiyetler</option>
          <option value="Male">Erkek</option>
          <option value="Female">Kadın</option>
          <option value="unknown">Bilinmiyor</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {characters.map((character) => (
          <div
            key={character.id}
            className="bg-white/55 border p-2 rounded shadow  overflow-hidden transform transition-all duration-500 hover:scale-105 hover:z-10 hover:shadow-2xl"
          >
            <img src={character.image} alt={character.name} />

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
              <span>Son bilinen konum:</span>
              <span>{character.location.name}</span>
            </div>
            <div className="flex gap-1 text-[13px] text-gray-500 mt-2">
              <span>İlk kez görüldüğü yer:</span>
              <span>{character.origin.name}</span>
            </div>
          </div>
        ))}
      </div>
      {characters.length === 0 && (
        <p className="text-center mt-4">Karakter bulunamadı</p>
      )}
      <div className="flex justify-center mt-6 mb-10">
        {info.prev && (
          <button
            onClick={handlePreviousPage}
            className="border px-4 py-2 mx-2 hover:scale-105 transform transition-all duration-100 active:opacity-40"
          >
            Önceki
          </button>
        )}
        {info.next && (
          <button
            onClick={handleNextPage}
            className="border px-4 py-2 mx-2 hover:scale-105 transform transition-all duration-100 active:opacity-40"
          >
            Sonraki
          </button>
        )}
      </div>
    </div>
  );
};

export default CharactersFilter;
