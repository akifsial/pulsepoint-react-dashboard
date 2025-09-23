import React, { useState, useRef, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

interface DropdownActionsProps {
  // onDelete: () => void;
  onDelete: () => Promise<void> | void; // allow async

  variant?: "default" | "simple";
}

const DeleteDropdownActions: React.FC<DropdownActionsProps> = ({
  onDelete,
  variant = "default",
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const getClassName = () => {
    const base = `w-full px-4 py-2 flex items-center gap-2 text-sm`;
    const hover =
      variant === "simple" ? "hover:bg-green-100" : "hover:bg-red-100";
    const color = variant === "simple" ? "text-black" : "text-red-600";
    return `${base} ${hover} ${color}`;
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await onDelete(); // wait for API
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        className="p-1 text-xl cursor-pointer text-gray-600 hover:text-black"
      >
        <HiDotsVertical />
      </button>

      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-md z-50"
        >
          <button
            onClick={handleDelete}
            disabled={loading}
            className={`${getClassName()} !pr-10 ${
              loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {variant === "default" && !loading && (
              <MdDelete className="text-red-600" />
            )}
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteDropdownActions;
