import type { Theme } from "@/types";
import { createContext } from "react";

export const ThemeContext = createContext<Theme>('light');