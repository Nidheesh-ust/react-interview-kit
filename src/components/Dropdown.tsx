import React, { useEffect, useRef, useState } from "react";
import "../dropdown.css";

interface DropdownOption {
    label: string;
    value: string;
}

interface DropdownProps {
    dropdownLabel: string;
    options: DropdownOption[];
    onSelect: (value: string) => void;
    color?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
    dropdownLabel,
    options,
    onSelect,
    color = "#bde4ff",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string>("");
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const [palatteColor, setPalatteColor] = useState<string>(color);
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
        const { target } = event;
        if (wrapperRef.current && target instanceof Node && !wrapperRef.current.contains(target)) {
            setIsOpen(false);
            setHighlightedIndex(-1);
        }
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (!isOpen) setHighlightedIndex(0);
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

        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault(); 
        }
        switch (e.key) {
            case "ArrowDown":
                setHighlightedIndex((prev) => (prev + 1) % options.length);
                break;
            case "ArrowUp":
                setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
                break;
            case "Enter":
                if (highlightedIndex >= 0 && highlightedIndex < options.length) {
                    handleSelect(options[highlightedIndex].value);
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
        <div className="dropdown-wrapper">
            {/* Dropdown box */}
            <div className="dropdown" ref={wrapperRef}>
                <label className="dropdown-label">{dropdownLabel}</label>

                <div
                    tabIndex={0}
                    onClick={handleToggle}
                    onKeyDown={handleKeyDown}
                    className="dropdown-header"
                >
                    {selected && (
                        <span className="color-box selected-color" style={{ backgroundColor: selected }} />
                    )}
                    {selected || "Select..."}
                </div>

                {isOpen && (
                    <ul className="dropdown-list">
                        {options.map((opt, index) => (
                            <li
                                key={opt.value}
                                onClick={() => handleSelect(opt.label)}
                                className={`dropdown-item ${highlightedIndex === index ? "highlighted" : ""}`}
                                style={highlightedIndex === index ? { backgroundColor: color } : {}}
                            >
                                <span className="color-box" style={{ backgroundColor: opt.value }} />
                                {opt.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>


            <div className="color-palette">
                <label htmlFor="palette-color">Palette:</label>
                <input
                    type="color"
                    value={palatteColor}
                    onChange={(e) => setPalatteColor(e.target.value)}
                    className="color-picker"
                    id="palette-color"
                />
            </div>
        </div>
    );
};
