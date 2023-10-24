import { createContext, useEffect, useState } from "react";

// type Theme = 'dark' | ''

interface appContextProps {
  theme?: string
  alterTheme?: () => void
}

export const appContext = createContext<appContextProps>({})

export function AppProvider(props: any) {
  const [theme, setTheme] = useState('dark')

  function alterTheme() {
    const newTheme = theme === '' ? 'dark' : ''
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    const themeSaved = localStorage.getItem('theme')
    setTheme(themeSaved!)
  }, [])

  return (
    <appContext.Provider value={{
      theme,
      alterTheme
    }}>
      {props.children}
    </appContext.Provider>
  )
}

 