import React, { useState } from 'react';

function Search() {
  const [searchText, setSearchText] = useState("");

  const onSearchButtonClick = () => {
    console.log("Search Text:", searchText);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-8 px-4">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6 6a7.5 7.5 0 0 0 10.65 10.65z"
            />
          </svg>
        </div>

        {/* Search Input */}
        <input
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="block w-full p-3 pl-10 pr-28 text-sm text-gray-700 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow"
          placeholder="Search for ZipCode"
        />

        {/* Search Button */}
        <button
          type="button"
          onClick={onSearchButtonClick}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-full shadow transition-all duration-300"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
