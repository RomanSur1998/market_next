import React, { useEffect } from "react";

export const useEscListener = (onEscPress: Function) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        console.log("Esc pressed");
        onEscPress();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onEscPress]);
};
