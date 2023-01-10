import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import React, { useState } from "react"

enum Themes {
  LIGHT = "light",
  DARK = "dark",
}

type ThemeValue = [Themes, () => void]

export const ThemeContext = React.createContext<ThemeValue>([
  Themes.DARK,
  () => {},
])

export default function ThemeProvider({
  children,
}: {
  children: ReactJSXElement
}) {
  const [theme, setTheme] = useState(Themes.LIGHT)
  const toggleTheme = () =>
    theme === Themes.LIGHT ? setTheme(Themes.DARK) : setTheme(Themes.LIGHT)

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

export const UseThemeContext = () => ThemeContext
