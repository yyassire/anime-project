import React from "react";
import CharactersFilter from "./components/FilterCharacters";
import Image from "next/image";

interface ProductSearchParams {
  page?: string;
  status?: string;
  gender?: string;
}

const CharactersPage = async ({
  searchParams,
}: {
  searchParams: ProductSearchParams;
}) => {
  // Destructure searchParams without awaiting
  const { page, status, gender } = searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  let url = `https://rickandmortyapi.com/api/character?page=${currentPage}`;
  if (status) {
    url += `&status=${status}`;
  }
  if (gender) {
    url += `&gender=${gender}`;
  }

  // Fetch data from the API
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  const data = await res.json();

  return (
    <div className="bg-gray-200 overflow-x-hidden">
      <div className="relative">
        <Image
          src="/img/wp2166981-morty-wallpapers.png"
          alt="Rick ve Morty"
          className="w-full h-[70vh] object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-center text-gray-300 font-bold text-xl text-[25px] md:text-[50px] ">
            Rick ve Morty Karakterleri
          </h1>
        </div>
      </div>

      <CharactersFilter
        characters={data.results}
        info={data.info}
        currentPage={currentPage.toString()}
      />
    </div>
  );
};

export default CharactersPage;
