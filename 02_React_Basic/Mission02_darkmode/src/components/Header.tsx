import { useTheme } from "../contexts/ThemeContext";

const Header = () => {
    const {theme, changeTheme} = useTheme();
    const innerText:'on'|'off' = theme == 'light'? 'on': 'off'

    const buttonClass = `
    border-solid border-gray-300 border-2 rounded-md
    ${theme == 'dark'
        ? 'bg-white text-black'
        : 'bg-black text-white'}`
    return (
        <header>
            <span>Header </span>
            <button className={buttonClass} onClick={changeTheme}>nightmode {innerText}</button>
        </header>
    )
}

export default Header