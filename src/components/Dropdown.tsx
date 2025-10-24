import React, { useEffect, useRef, useState } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1); // for keyboard nav
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    const target = event.target;
    if (wrapperRef.current && target instanceof Node && !wrapperRef.current.contains(target)) {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setHighlightedIndex(0); // highlight first item when opening
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsOpen(true);
      setHighlightedIndex(0);
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
        break;
      case "Enter":
        if (highlightedIndex >= 0 && highlightedIndex < options.length) {
          handleSelect(options[highlightedIndex]);
        } else {
          setIsOpen(!isOpen);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <div className="dropdown" ref={wrapperRef}>
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
          {options.map((opt, index) => (
            <li
              key={opt}
              onClick={() => handleSelect(opt)}
              style={{
                padding: "8px",
                cursor: "pointer",
                background: highlightedIndex === index ? "#bde4ff" : "#fff", // highlight
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
