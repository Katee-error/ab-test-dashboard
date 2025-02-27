import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UseKeyboardNavigationProps {
  itemsLength: number;
  onEnterPress: (index: number) => void;
  onFinalizePress?: (index: number) => void;
}

export const useKeyboardNavigation = ({
  itemsLength,
  onEnterPress,
  onFinalizePress,
}: UseKeyboardNavigationProps) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (itemsLength === 0) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          setCurrentIndex((prev) => (prev === null || prev === itemsLength - 1 ? 0 : prev + 1));
          break;
        case "ArrowUp":
          setCurrentIndex((prev) => (prev === null || prev === 0 ? itemsLength - 1 : prev - 1));
          break;
        case "Enter":
        case "r":
          if (currentIndex !== null) {
            onEnterPress(currentIndex);
          }
          break;
        case "f":
          if (currentIndex !== null && onFinalizePress) {
            onFinalizePress(currentIndex);
          }
          break;
        case "Escape":
          setCurrentIndex(null);
          navigate("/"); 
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [itemsLength, currentIndex, onEnterPress, onFinalizePress, navigate]);

  return { currentIndex };
};
