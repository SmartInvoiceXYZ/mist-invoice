import React, { createContext, useContext, useEffect, useState } from "react";

import { search } from "../graphql";
import { ChainId, logError } from "../utils";
import { Web3Context } from "./Web3Context";

export type SearchContextType = {
  search?: string;
  setSearch: (search: string) => void;
  fetching?: boolean;
  result?: any;
  loading?: boolean;
};

export const SearchContext = createContext<SearchContextType>({
  setSearch: () => {}
});

export const SearchContextProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const { chainId } = useContext(Web3Context);
  const [fetching, setFetching] = useState(false);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setFetching(true);
      setLoading(true);
      search(chainId as ChainId, query)
        .then((res) => {
          setResult(res);
          setFetching(false);
          setLoading(false);
        })
        .catch((searchError) => {
          logError({ searchError });
          setResult(undefined);
          setFetching(false);
          setLoading(false);
        });
    } else {
      setResult(undefined);
    }
  }, [chainId, query]);

  return (
    <SearchContext.Provider
      value={{ search: query, setSearch: setQuery, fetching, result, loading }}
    >
      {children}
    </SearchContext.Provider>
  );
};
