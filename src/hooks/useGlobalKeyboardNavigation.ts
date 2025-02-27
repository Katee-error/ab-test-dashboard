import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UseGlobalKeyboardNavigation = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const handleGlobalKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          console.log("Esc pressed: Navigating to home");
          navigate("/");
        }
      };
  
      window.addEventListener("keydown", handleGlobalKeyDown);
      return () => {
        window.removeEventListener("keydown", handleGlobalKeyDown);
      };
    }, [navigate]);
  
    return null; 
  };