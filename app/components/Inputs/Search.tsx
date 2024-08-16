// src/components/Inputs/Search.tsx
import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchProps<T> {
  data: T[];
  onFilter: (filteredData: T[]) => void;
  className?: string;
}

const Search = <T extends { [key: string]: any }>({
  data,
  onFilter,
  className,
}: SearchProps<T>) => {
  const [query, setQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const filteredData = data.filter((item) => {
      return Object.values(item).some(
        (value) =>
          value !== undefined &&
          value !== null &&
          value.toString().toLowerCase().includes(query.toLowerCase())
      );
    });
    onFilter(filteredData);
  }, [query, data, onFilter]);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="relative flex justify-center items-center z-[99]">
      <div className="lg:hidden">
        <MagnifyingGlassIcon
          className="h-6 w-6 text-gray-400 cursor-pointer"
          onClick={toggleSearch}
        />
        <div
          className={`${
            isSearchVisible ? "block" : "hidden"
          } fixed top-0 left-0 right-0 bg-white p-2 border-b border-gray-300 shadow-lg z-50`}
        >
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-sm text-stone-700"
          />
        </div>
      </div>
      <div className="hidden lg:block relative">
        <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`pl-10 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-sm text-stone-700 ${className}`}
        />
      </div>
    </div>
  );
};

export default Search;