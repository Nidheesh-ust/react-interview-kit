import React, { useState } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") setIsOpen(!isOpen);
    if (e.key === "Escape") setIsOpen(false);
    
  };

  return (
    <div className="dropdown">
      <label className="dropdown-label">{label}</label>

      <div
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        style={{
          border: "1px solid #1b0303ff",
          padding: "8px",
          width: "200px",
          cursor: "pointer",
          userSelect: "none",
          background: "#fff",
        }}
      >
        {selected || "Select..."}
      </div>

      {isOpen && (
        <ul
          style={{
            border: "1px solid #ccc",
            padding: 0,
            margin: 0,
            listStyle: "none",
            width: "200px",
            background: "#fff",
          }}
        >
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => handleSelect(opt)}
              style={{
                padding: "8px",
                cursor: "pointer",
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
