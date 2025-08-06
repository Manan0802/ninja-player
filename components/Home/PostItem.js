import React, { useState, useEffect } from 'react';
import { HiOutlineLocationMarker, HiOutlineCalendar } from 'react-icons/hi';
import { useSession } from 'next-auth/react';
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import app from '@/shared/FirebaseConfig';
import JoinModal from '../JoinModal';

function PostItem({ post }) {
  const supportedGames = [
    'cricket', 'badminton', 'football', 'tabletennis', 'tennis', 'treking',
  ];

  const { data: session } = useSession();
  const [joining, setJoining] = useState(false);
  const [showPlayers, setShowPlayers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  const db = getFirestore(app);

  const gameKey = post?.game?.toLowerCase().replace(/\s/g, '');
  const normalizedKey = gameKey === 'trekking' ? 'treking' : gameKey;

  const imagePath = supportedGames.includes(normalizedKey)
    ? `/images/${normalizedKey}.webp`
    : '/images/others.logo.webp';

  useEffect(() => {
    if (session?.user?.email && post?.registeredPlayers) {
      const hasJoined = post.registeredPlayers.some(
        (player) => player.email === session.user.email
      );
      setAlreadyJoined(hasJoined);
    }
  }, [session, post]);

  const handleJoin = async () => {
    if (!session?.user?.email) return alert('Please login to join');

    try {
      setJoining(true);
      const postRef = doc(db, 'posts', post.id);
      await updateDoc(postRef, {
        registeredPlayers: arrayUnion({
          name: session.user.name || '',
          email: session.user.email,
          image: session.user.image || '',
        }),
      });
      setShowModal(true);
      setAlreadyJoined(true);
    } catch (err) {
      console.error('Error joining event:', err);
      alert('❌ Failed to join. Please try again.');
    } finally {
      setJoining(false);
    }
  };

  const handleUnjoin = async () => {
    if (!session?.user?.email) return;

    const postRef = doc(db, 'posts', post.id);
    const playerData = post.registeredPlayers.find(
      (p) => p.email === session.user.email
    );

    if (!playerData) return;

    try {
      await updateDoc(postRef, {
        registeredPlayers: arrayRemove(playerData),
      });
      setAlreadyJoined(false);
      setShowPlayers(false);
    } catch (err) {
      console.error('Error unjoining event:', err);
      alert('❌ Failed to unjoin. Please try again.');
    }
  };

  return (
    <>
      {showModal && (
        <JoinModal show={showModal} onClose={() => setShowModal(false)} />
      )}

      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <img
          className="w-full h-48 object-cover"
          src={imagePath}
          alt={post?.game || 'Game'}
        />

        <div className="p-4 text-gray-800">
          <h3 className="text-lg font-bold mb-2 text-center">{post?.title}</h3>

          <p className="text-sm mb-2">
            <span className="font-semibold">Game:</span> {post?.game}
          </p>

          <div className="flex items-center text-sm mb-1">
            <HiOutlineLocationMarker className="mr-2 text-blue-600" />
            <span>{post?.place}</span>
          </div>

          <div className="flex items-center text-sm mb-3">
            <HiOutlineCalendar className="mr-2 text-green-600" />
            <span>{post?.date}</span>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            <span className="font-semibold">Posted by:</span> {post?.CreatedBy}
          </p>

          {/* Join / Unjoin */}
          {alreadyJoined ? (
            <button
              onClick={handleUnjoin}
              className="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition"
            >
              Unjoin Event
            </button>
          ) : (
            <button
              onClick={handleJoin}
              disabled={joining}
              className="w-full mt-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition disabled:opacity-50"
            >
              {joining ? 'Joining...' : 'Join Event'}
            </button>
          )}

          {/* Player Count */}
          <p className="text-sm text-gray-700 text-center mt-2">
            {(post.registeredPlayers?.length || 0)} player
            {(post.registeredPlayers?.length || 0) !== 1 ? 's' : ''} joined
          </p>

          {/* Toggle View Players */}
          {(post.registeredPlayers?.length || 0) > 0 && (
            <button
              onClick={() => setShowPlayers(!showPlayers)}
              className="text-blue-600 underline text-sm mt-1 block mx-auto"
            >
              {showPlayers ? 'Hide Players' : 'View Players'}
            </button>
          )}

          {/* Player List */}
          {showPlayers && (
            <ul className="mt-2 bg-gray-100 p-2 rounded text-sm space-y-2 max-h-40 overflow-y-auto">
              {post.registeredPlayers?.map((player, idx) => (
                <li key={idx} className="flex items-center gap-3 px-2">
                  {player.image ? (
                    <img
                      src={player.image}
                      alt={player.name || 'User'}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-gray-800 font-medium">
                      {player.name || 'Unknown'}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {player.email}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default PostItem;
