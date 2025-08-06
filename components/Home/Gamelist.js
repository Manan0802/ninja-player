// components/Home/Gamelist.js

import React from 'react';

const games = [
  { id: 1, name: 'Cricket', image: '/images/cricket.logo.webp' },
  { id: 2, name: 'Football', image: '/images/football.logo.webp' },
  { id: 3, name: 'Table Tennis', image: '/images/tabletennis.logo.webp' },
  { id: 4, name: 'Tennis', image: '/images/tennis.logo.webp' },
  { id: 5, name: 'Badminton', image: '/images/badminton.logo.webp' },
  { id: 6, name: 'Trekking', image: '/images/treking.logo.webp' },
  { id: 7, name: 'Others', image: '/images/others.logo.webp' },
];

function Gamelist() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 py-10">
      {games.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center bg-white border border-gray-200 rounded-2xl p-5 shadow-md cursor-pointer group transition-transform duration-300 hover:scale-105 hover:animate-bounce"
        >
          {/* Icon inside circular box */}
          <div className="w-24 h-24 flex items-center justify-center overflow-hidden rounded-full border border-gray-300">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Game Name Text */}
          <span className="text-center text-[15px] font-semibold text-gray-800 mt-3">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Gamelist;
