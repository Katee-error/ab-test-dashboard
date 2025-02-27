import { useState, useEffect } from "react";

interface UseKeyboardNavigationProps {
  itemsLength: number;
  onEnterPress: (index: number) => void;
}

export const useKeyboardNavigation = ({
  itemsLength,
  onEnterPress,
}: UseKeyboardNavigationProps) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    if (itemsLength === 0) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          setCurrentIndex((prev) => (prev === null || prev >= itemsLength - 1 ? 0 : prev + 1));
          break;
        case "ArrowUp":
          setCurrentIndex((prev) => (prev === null || prev <= 0 ? itemsLength - 1 : prev - 1));
          break;
        case "Enter":
          if (currentIndex !== null && currentIndex < itemsLength) {
            onEnterPress(currentIndex);
          }
          break;
        case "Escape":
          setCurrentIndex(null); 
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [itemsLength, currentIndex, onEnterPress]);

  return { currentIndex };
};
