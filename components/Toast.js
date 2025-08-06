// components/Toast.js
export default function Toast({ msg, closeToast }) {
  return (
    <div className="bg-green-500 text-white px-4 py-2 rounded shadow-lg flex justify-between items-center space-x-4">
      <span>{msg}</span>
      <button
        onClick={closeToast}
        className="bg-white text-green-600 font-bold px-2 py-1 rounded"
      >
        ×
      </button>
    </div>
  );
}
