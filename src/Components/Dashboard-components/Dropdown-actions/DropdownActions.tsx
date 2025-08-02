

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { MdFlag } from "react-icons/md"; // For Flag icon
import { MdDone } from "react-icons/md"; // For Approve icon

interface DropdownActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  onFlag?: () => void;
  onApprove?: () => void;
  onJoin?: () => void;

  variant?: "default" | "simple";
}

const DropdownActions: React.FC<DropdownActionsProps> = ({
  onEdit,
  onDelete,
  onFlag,
  onView,
  onApprove,
  onJoin,
  
  variant = "default",
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

  const getClassName = (
    type: "view" | "edit" | "flag" | "delete" | "approve" | "edit"
  ) => {
    const base = `w-full px-4 py-2 flex items-center gap-2 text-sm`;
    const hover =
      variant === "simple"
        ? "hover:bg-green-100"
        : type === "delete"
        ? "hover:bg-red-100"
        : "hover:bg-gray-100";
    const color =
      variant === "simple"
        ? "text-black"
        : type === "delete"
        ? "text-red-600"
        : "text-gray-600";

    return `${base} ${hover} ${color}`;
  };

  const getLabel = (label: string) => {
    switch (label) {
      case "view":
        return "View Details";
      case "edit":
        return "Edit";
      case "approve":
        return "Approve Post";
      case "flag":
        return "Flag Post";
      case "delete":
        return "Delete";
      default:
        return label;
    }
  };

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
                className={getClassName("view")}
              >
                {variant === "default" && <IoEye className="text-gray-600" />}
                {getLabel("view")}
              </button>
            )}
            {onEdit && (
              <button
                onClick={() => {
                  onEdit();
                  setOpen(false);
                }}
                className={getClassName("edit")}
              >
                {variant === "default" && <IoEye className="text-gray-600" />}
                {getLabel("edit")}
              </button>
            )}

            {onApprove && (
              <button
                onClick={() => {
                  onApprove();
                  setOpen(false);
                }}
                className={getClassName("approve")}
              >
                {variant === "default" && <MdDone className="text-gray-600" />}
                {getLabel("approve")}
              </button>
            )}

            {onFlag && (
              <button
                onClick={() => {
                  onFlag();
                  setOpen(false);
                }}
                className={getClassName("flag")}
              >
                {variant === "default" && <MdFlag className="text-gray-600" />}
                {getLabel("flag")}
              </button>
            )}

            {onDelete && (
              <button
                onClick={() => {
                  onDelete();
                  setOpen(false);
                }}
                className={getClassName("delete")}
              >
                {variant === "default" && <MdDelete className="text-red-600" />}
                {getLabel("delete")}
              </button>
            )}

            {onJoin && (
              <button
                onClick={() => {
                  onJoin();
                  setOpen(false);
                }}
                className={getClassName("join")}
              >
                {variant === "default" && <MdDelete className="text-red-600" />}
                {getLabel("Join")}
              </button>
            )}

          </div>,
          document.body
        )}
    </>
  );
};

export default DropdownActions;
