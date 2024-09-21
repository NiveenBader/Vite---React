import { createContext, useContext, useState } from "react";

export const searchContext = createContext({
  search: "",
  handleSearch: () => {},
});

searchContext.displayName = "Search";

export function SearchProvider({ children }) {
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <searchContext.Provider
      value={{
        search,
        handleSearch,
      }}
    >
      {children}
    </searchContext.Provider>
  );
}
export function useSearch() {
  return useContext(searchContext);
}
