import { createContext, useCallback, useState } from "react";
import { App } from "./App";
import type { Theme } from "./types";
import { ThemeContext } from "./context/theme";
import { Title } from "./Title";

export function Root() {
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = useCallback(() => {
    setTheme((t) => t === 'light' ? 'dark' : 'light')
  }, []);

  return <ThemeContext.Provider value={theme}>
    <Title title="Root" />
    <App toggleTheme={toggleTheme} />
  </ThemeContext.Provider>;
}
