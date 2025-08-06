import React, { useEffect } from 'react';
import { HiOutlineCalendar, HiOutlineLocationMarker } from 'react-icons/hi';

function PostModal({ post }) {
  useEffect(() => {
    if (post) {
      document.getElementById('my_modal_1')?.showModal();
    }
  }, [post]);

  if (!post) return null;

  const gameKey = post?.game?.toLowerCase().replace(/\s/g, '');
  const imagePath = `/images/${gameKey}.webp`;

  const organizerName = post?.CreatedBy?.split('@')[0] || 'Unknown';

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box max-w-2xl w-full p-0 overflow-hidden rounded-lg bg-white">
        {/* Image */}
        <img
          src={imagePath}
          alt={post?.game || 'Game'}
          className="w-full h-56 object-cover"
        />

        <div className="p-6 text-gray-800">
          {/* Title */}
          <h2 className="text-xl font-semibold mb-2">{post?.title || 'Untitled Post'}</h2>

          {/* Date */}
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <HiOutlineCalendar className="text-orange-500 mr-1" />
            <span>{post?.date || 'Date not provided'}</span>
          </div>

          {/* Place */}
          <div className="flex items-center text-sm text-blue-600 mb-4">
            <HiOutlineLocationMarker className="mr-1" />
            <a href="#" className="hover:underline">
              {post?.place || 'Unknown Location'}
            </a>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4">
            {post?.title || 'No description provided'}{', We are looking for players!'}
          </p>

          {/* Posted By */}
          <div className="flex items-center gap-3 border-t pt-4">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold text-sm">
              {organizerName.charAt(0).toUpperCase()}
            </div>

            {/* Name & Email */}
            <div>
              <p className="text-sm font-semibold text-gray-800">{organizerName}</p>
              <p className="text-xs text-gray-600">{post?.CreatedBy}</p>
            </div>
          </div>

          {/* Close Button */}
          <div className="modal-action mt-6">
            <form method="dialog">
              <button className="btn bg-blue-600 text-white hover:bg-blue-700">Close</button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default PostModal;
