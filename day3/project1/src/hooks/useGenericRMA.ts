import { useState, useEffect } from "react";
import axios from "axios";
import { Character, Episode, Response, Location } from "../models/model";

const useGenericRMA = <T>(root: string, page: number): [T[], boolean, number] => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    axios.get<Response<T>>(`https://rickandmortyapi.com/api/${root}?page=${page}`)
      .then((response) => {
        setData(response.data.results);
        setTotalPages(response.data.info.pages); // Set the total number of pages
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [root, page]);

  return [data, loading, totalPages];
};

export const useCharacters = (page: number) =>
  useGenericRMA<Character>("character", page);

export const useEpisodes = (page: number) =>
  useGenericRMA<Episode>("episode", page);

export const useLocation = (page: number) =>
  useGenericRMA<Location>("location", page);