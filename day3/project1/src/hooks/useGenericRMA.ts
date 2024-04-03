import { useState, useEffect } from "react";
import axios from "axios";
import { Character, Episode, Response, Location } from "../models/model";

// Add a `searchQuery` parameter to the hook
const useGenericRMA = <T>(
  root: string,
  page: number,
  searchQuery: string = ""
): [T[], boolean, number] => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    const queryParam = searchQuery
      ? `&name=${encodeURIComponent(searchQuery)}`
      : ""; // Prepare the search query parameter
    axios
      .get<Response<T>>(
        `https://rickandmortyapi.com/api/${root}?page=${page}${queryParam}`
      )
      .then((response) => {
        setData(response.data.results);
        setTotalPages(response.data.info.pages); // Set the total number of pages
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [root, page, searchQuery]); // Include `searchQuery` as a dependency

  return [data, loading, totalPages];
};

// Update the specialized hooks to accept a `searchQuery` parameter
export const useCharacters = (page: number, searchQuery: string) =>
  useGenericRMA<Character>("character", page, searchQuery);

export const useEpisodes = (page: number, searchQuery: string) =>
  useGenericRMA<Episode>("episode", page, searchQuery);

export const useLocation = (page: number, searchQuery: string) =>
  useGenericRMA<Location>("location", page, searchQuery);
