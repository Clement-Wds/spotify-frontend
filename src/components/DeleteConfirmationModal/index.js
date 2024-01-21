// DeleteConfirmationModal.js
import React from 'react';

const DeleteConfirmationModal = ({isOpen, onClose, playlist, onDelete}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center">
      <div className="bg-white rounded-lg text-center p-4 shadow-xl">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Are you sure you want to delete {playlist.name} ?
        </h3>
        <div className="mt-4">
          <button
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
            onClick={onDelete}>
            Delete
          </button>
          <button
            className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
            onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
