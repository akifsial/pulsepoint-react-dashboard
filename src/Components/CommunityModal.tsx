import React, { useState } from "react";
import { X } from "lucide-react";

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void; // Simplified the type for now
}

const CommunityModal: React.FC<CommunityModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Handle form data changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Community Form Data:", formData);  // Log form data to the console
    onSubmit(formData); // Call onSubmit prop with form data
    onClose();  // Close the modal after form submission
  };

  // Modal close handler (clicking outside modal or pressing Escape)
  const handleModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleEscapeKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleModalClose}
      onKeyDown={handleEscapeKey}
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      aria-modal="true"
    >
      <div
        className="modal-content bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 id="modal-title" className="text-xl font-semibold text-gray-900">Tell us about your community</h2>
          <p id="modal-description" className="mt-2 text-sm text-gray-600">
            A name and description help people understand what your community is all about.
          </p>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          {/* Community Name Input */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Community Name<span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter community name"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Community Description Input */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-900">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a description"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-3 px-4 rounded-lg shadow-md"
            >
              Create Community
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityModal;
