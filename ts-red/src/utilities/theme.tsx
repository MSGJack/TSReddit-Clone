import { useEffect, useState } from "react";

type Theme = "dark" | "light";
//type ChangeTheme = React.ChangeEvent<HTMLInputElement>;
type useTheme = [Theme, () => void];

export const ThemeProvider = (iniitialTheme: Theme): useTheme => {
  const [theme, setTheme] = useState<Theme>(iniitialTheme);
  /*const handleChange = (e: ChangeTheme) =>
    setTheme(e.target.checked ? "dark" : "light");
*/
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return [theme, toggleTheme];
};
