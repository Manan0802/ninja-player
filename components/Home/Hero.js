import React from 'react';

function Hero() {
  return (
    <div className="text-center mt-16 px-4">
      {/* Main Title */}
      <h1 className="text-[35px] md:text-[45px] font-extrabold leading-snug">
        Find & Discover Players <br />
        <span className="text-blue-600">Near You</span>
      </h1>

      {/* Description */}
      <h2 className="text-gray-500 mt-4 px-6 md:px-16 text-base md:text-lg">
        Best Free Website to find and discover game partner/player near you for your favorite game
      </h2>
    </div>
  );
}

export default Hero;
