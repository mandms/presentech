import React, { useEffect, createContext, useState, useContext } from 'react';


const StorageKey = 'theme';
const supportedThemes = {
    light: 'light',
    dark: 'dark',
};

type Themes = keyof typeof supportedThemes;

const ThemeContext = createContext<{
    theme: Themes;
    setTheme: React.Dispatch<React.SetStateAction<Themes>>;
    supportedThemes: { [key: string]: string };
} | undefined>(undefined);

const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            'You can use "useTheme" hook only within a <ThemeProvider> component.'
        );
    }

    return context;
};

const getTheme = (): Themes => {
    let theme = localStorage.getItem(StorageKey);

    if (!theme) {
        localStorage.setItem(StorageKey, 'light');
        theme = 'light';
    }

    return theme as Themes;
};

const Theme = (props: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Themes>(getTheme);

    useEffect(() => {
        localStorage.setItem(StorageKey, theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                supportedThemes,
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    )
};

Theme.SimpleToggler = function SimpleToggler() {
    const { theme, setTheme } = useTheme();

    const handleSwitchTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    return (
        <div onClick={handleSwitchTheme}>
        </div>
    );
};


export { useTheme };
export default Theme;