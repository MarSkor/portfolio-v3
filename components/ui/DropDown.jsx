"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({ value, onChange, options, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || label;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setIsOpen(true);
      return;
    }

    if (isOpen) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          handleSelect(options[highlightedIndex].value);
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          break;
        default:
          break;
      }
    }
  };

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const handleMouseEnter = (index) => {
    setHighlightedIndex(index);
  };

  return (
    <div className="relative w-full md:w-auto">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="w-full md:w-auto flex items-center justify-between border border-border bg-background px-4 py-2.5 font-mono text-sm uppercase tracking-wider text-foreground transition-all duration-200 hover:border-foreground/40 focus:outline-none focus:border-foreground group"
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={`h-4 w-4 ml-2 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 border border-border bg-background shadow-xl"
          style={{
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          <ul className="py-1">
            {options.map((option, index) => (
              <li key={option.value}>
                <button
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  className={`w-full px-4 py-2.5 text-left font-mono text-sm uppercase tracking-wider transition-colors duration-150 ${
                    value === option.value
                      ? "bg-foreground text-background"
                      : highlightedIndex === index
                        ? "bg-foreground/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
