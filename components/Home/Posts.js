import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import PostModal from './PostModal';

function Posts({ post }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedGame, setSelectedGame] = useState('');
  const [placeFilter, setPlaceFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const handleCardClick = (item) => {
    setSelectedPost(item);
  };

  // Filter the posts
  const filteredPosts = post.filter((item) => {
    const matchesGame =
      selectedGame === '' || item.game?.toLowerCase() === selectedGame.toLowerCase();
    const matchesPlace =
      placeFilter === '' || item.place?.toLowerCase().includes(placeFilter.toLowerCase());
    const matchesDate =
      dateFilter === '' || item.date === dateFilter;

    return matchesGame && matchesPlace && matchesDate;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* 🔍 Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Game Filter */}
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="border px-3 py-2 rounded w-40"
        >
          <option value="">All Games</option>
          <option value="Cricket">Cricket</option>
          <option value="Football">Football</option>
          <option value="Table Tennis">Table Tennis</option>
          <option value="Badminton">Badminton</option>
          <option value="Tennis">Tennis</option>
          <option value="Trekking">Trekking</option>
          <option value="Others">Others</option>
        </select>

        {/* Place Filter */}
        <input
          type="text"
          placeholder="Filter by place"
          value={placeFilter}
          onChange={(e) => setPlaceFilter(e.target.value)}
          className="border px-3 py-2 rounded w-40"
        />

        {/* Date Filter */}
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* 📦 Modal */}
      <PostModal post={selectedPost} />

      {/* 🧩 Post Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((item, index) => (
            <div key={index} onClick={() => handleCardClick(item)} className="cursor-pointer">
              <PostItem post={item} />
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-sm mt-4">No posts match your filters.</p>
        )}
      </div>
    </div>
  );
}

export default Posts;
