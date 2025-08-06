import React, { useEffect } from 'react';

function JoinModal({ show, onClose }) {
  useEffect(() => {
    if (show) {
      document.getElementById('join_modal')?.showModal();
    }
  }, [show]);

  return (
    <dialog id="join_modal" className="modal">
      <div className="modal-box text-center bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold text-green-600 mb-2">✅ Joined Successfully!</h2>
        <p className="text-gray-700">You have been registered for this event.</p>

        <div className="modal-action mt-4 justify-center">
          <form method="dialog">
            <button
              onClick={onClose}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default JoinModal;
