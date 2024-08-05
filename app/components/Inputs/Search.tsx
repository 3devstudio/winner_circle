// src/components/Inputs/Search.tsx
import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchProps<T> {
  data: T[];
  onFilter: (filteredData: T[]) => void;
}

const Search = <T extends { [key: string]: any }>({
  data,
  onFilter,
}: SearchProps<T>) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const filteredData = data.filter((item) => {
      return Object.values(item).some(
        (value) =>
          value !== undefined &&
          value !== null &&
          value.toString().toLowerCase().includes(query.toLowerCase()),
      );
    });
    onFilter(filteredData);
  }, [query, data, onFilter]);

  return (
    <div className="relative">
      <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition w-full text-sm text-stone-700"
      />
    </div>
  );
};

export default Search;