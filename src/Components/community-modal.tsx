// import React, { useState } from "react";
// import { X } from "lucide-react";
// import InputField from "./InputField";

// interface CommunityModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: any) => void;
// }

// const CommunityModal: React.FC<CommunityModalProps> = ({
//   isOpen,
//   onClose,
//   onSubmit,
// }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//   });

//   // Handle form data changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     onSubmit(formData);
//     onClose();
//   };

//   // Modal close handler (clicking outside modal or pressing Escape)
//   const handleModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.target === e.currentTarget) onClose();
//   };

//   const handleEscapeKey = (e: React.KeyboardEvent) => {
//     if (e.key === "Escape") onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4"
//       onClick={handleModalClose}
//       onKeyDown={handleEscapeKey}
//       role="dialog"
//       aria-labelledby="modal-title"
//       aria-describedby="modal-description"
//       aria-modal="true"
//     >
//       <div
//         className="modal-content  rounded-xl shadow-2xl w-full max-w-xl min-h-[450px] mx-4 p-6 space-y-6"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Modal Header */}
//         <div className="relative">
//           <button
//             onClick={onClose}
//             className="absolute top-0 right-0 p-2 text-gray-400 transition-colors duration-200 rounded-full"
//             aria-label="Close modal"
//           >
//             <X className="w-5 h-5" />
//           </button>
//           <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
//             Tell us about your community
//           </h2>
//           <p id="modal-description" className="mt-2 text-sm text-gray-600">
//             A name and description help people understand what your community is
//             all about.
//           </p>
//         </div>

//         {/* Modal Form */}
//         <form onSubmit={handleSubmit}>
//           <div className="space-y-2">
//             {/* Community Name Input */}
//             <InputField
//               label="Create Community Name"
//               asterisk
//               id="name"
//               name="name"
//               placeholder="Enter name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Community Description Input */}
//           <div className="space-y-2">
//             <label
//               htmlFor="description"
//               className="block text-sm font-medium text-gray-900"
//             >
//               Add a Description<span className="text-red-500">*</span>
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Enter a description"
//               className="w-full px-4 py-3 border rounded-lg"
//               rows={4}
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="pt-2">
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white font-medium py-3 px-4 rounded-lg shadow-md"
//             >
//               Next
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CommunityModal;
