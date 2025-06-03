import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";

interface DropdownActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

const DropdownActions: React.FC<DropdownActionsProps> = ({
  onEdit,
  onDelete,
  onView,
}) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        className="p-1 text-xl text-gray-600 hover:text-black"
      >
        <HiDotsVertical />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            className="absolute z-50 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-md animate-dropdown"
            style={{
              top:
                btnRef.current?.getBoundingClientRect().bottom +
                window.scrollY +
                4,
              left:
                btnRef.current?.getBoundingClientRect().left +
                window.scrollX -
                135 +
                (btnRef.current?.offsetWidth || 0),
              position: "absolute",
            }}
          >
            {onView && (
              <button
                onClick={() => {
                  onView();
                  setOpen(false);
                }}
                className="w-full px-4 py-2 flex items-center gap-2 text-sm hover:bg-gray-100"
              >
                <IoEye className="text-gray-600" /> View
              </button>
            )}
            {onEdit && (
              <button
                onClick={() => {
                  onEdit();
                  setOpen(false);
                }}
                className="w-full px-4 py-2 flex items-center gap-2 text-sm hover:bg-gray-100"
              >
                <FaEdit className="text-gray-600" /> Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => {
                  onDelete();
                  setOpen(false);
                }}
                className="w-full px-4 py-2 flex items-center gap-2 text-sm text-red-600 hover:bg-red-100"
              >
                <MdDelete className="text-red-600" /> Delete
              </button>
            )}
          </div>,
          document.body
        )}
    </>
  );
};

export default DropdownActions;
