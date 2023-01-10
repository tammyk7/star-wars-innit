import { Link, Route, Routes } from "react-router-dom"
import "./App.css"
import BioPage from "./BioPage"
import HomePage from "./HomePage"
import { useContext } from "react"
import { UseThemeContext } from "./Providers/ThemeProvider"
import { GiLightSabers } from "react-icons/gi"

function App() {
  const [theme, toggleTheme] = useContext(UseThemeContext())
  return (
    <div className={`app ${theme}`}>
      <header>
        <GiLightSabers onClick={toggleTheme} className={"icon"} />
        <div>
          <Link to={"/"} className={"title"}>
            <h1 className='title'>Star Wars Innit</h1>
          </Link>
          <div className='search-container'>
            <input
              className='search-bar'
              type='text'
              placeholder='Search Character'
            />
            <button className='search-button'>Search</button>
          </div>
        </div>
        <GiLightSabers onClick={toggleTheme} className={"icon"} />
      </header>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/bio/:id' element={<BioPage />} />
      </Routes>
    </div>
  )
}

export default App
