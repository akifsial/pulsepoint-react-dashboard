import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { HiDotsVertical } from "react-icons/hi";

export interface DropdownActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  type?: "default" | "view" | "edit" | "flag" | "delete" | "approve";
}

interface DropdownActionsProps {
  actions: DropdownActionItem[];
  variant?: "default" | "simple";
  deleteText?: string;
  editText?: string;
}
const AdminDropdownAction: React.FC<DropdownActionsProps> = ({
  actions,
  variant = "default",
  deleteText,
  editText,
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
    type: "default" | "view" | "edit" | "flag" | "delete" | "approve"
  ) => {
    const base = `flex w-full px-2 py-2 items-center gap-2 text-sm cursor-pointer rounded-[5px] mb-1 last:mb-0`;
    const hover =
      variant === "simple"
        ? "hover:bg-green-100"
        : type === "simple"
         ? "hover:bg-red-100"
         : "hover:bg-[#E7F2F9]";
    const color =
      variant === "simple"
        ? "text-black"
        : type === "delete"

    return `${base} ${hover} ${color}`;
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
            className="absolute z-50 mt-2 w-36 bg-white border p-1.5 border-gray-200 rounded-md shadow-md animate-dropdown"
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
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  action.onClick();
                  setOpen(false);
                }}
                className={`${getClassName(action.type || "default")} group`}
              >
                <span className="leading-0">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default AdminDropdownAction;
