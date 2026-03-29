import { createContext, useContext, useState, type ReactNode } from "react";

type Theme = 'dark'|'light';

interface ThemeContextType {
    theme: Theme
    changeTheme: () => void
}

const ThemeContext = createContext<ThemeContextType|undefined>(
    undefined
)

export const ThemeProvider = ({children}: {children: ReactNode}) => {
    const [theme, setTheme] = useState<Theme>('light');
    const changeTheme = () => {
        setTheme((prev) => prev === 'dark'? 'light' : 'dark')
    }

    return <ThemeContext.Provider
        value={{theme, changeTheme}}
    >
        {children}
    </ThemeContext.Provider>
}

export const useTheme = () => {
    const theme = useContext(ThemeContext);
    if (!theme) {
        throw new Error("error");
    }
    
    return theme;
}
