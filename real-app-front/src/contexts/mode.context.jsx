import { createContext, useContext } from "react";
import { useState } from "react";

export const modecontext = createContext({
  theme: false,
  toggleTheme: () => {},
});

modecontext.displayName = "Mode";

export function ModeProvider({ children }) {
  const [theme, setٌTheme] = useState(localStorage.getItem("theme"));

  return (
    <modecontext.Provider value={{ theme, setٌTheme }}>
      {children}
    </modecontext.Provider>
  );
}
export function useMode() {
  return useContext(modecontext);
}
