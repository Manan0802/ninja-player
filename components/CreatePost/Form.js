import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/shared/FirebaseConfig';

const GAMES = [
  'Cricket',
  'Football',
  'Table Tennis',
  'Tennis',
  'Badminton',
  'Trekking',
  'Others',
];

function Form({ userEmail }) {
  const [form, setForm] = useState({
    title: '',
    game: '',
    place: '',
    date: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.game || !form.place || !form.date) {
      setError('All fields are required!');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const postData = {
        ...form,
        CreatedBy: userEmail,
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, 'posts'), postData);

      // ✅ Show popup success message
      alert('✅ Post created successfully!');

      setForm({ title: '', game: '', place: '', date: '' });
    } catch (err) {
      console.error('❌ Error adding post:', err);
      setError('Failed to post. Try again.');
    }

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-5 mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-700">Create a New Post</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Title */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Need 4 players for turf match"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Game Dropdown */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Game</label>
        <select
          name="game"
          value={form.game}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a game</option>
          {GAMES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Place */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Place</label>
        <input
          type="text"
          name="place"
          value={form.place}
          onChange={handleChange}
          placeholder="e.g. Delhi Turf"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Date Picker */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
      >
        {submitting ? 'Posting...' : 'Post'}
      </button>
    </form>
  );
}

export default Form;
