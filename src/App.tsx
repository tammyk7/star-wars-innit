import { Link, Route, Routes, useNavigate } from "react-router-dom"
import "./App.css"
import BioPage from "./BioPage"
import HomePage from "./HomePage"
import { useContext, useState } from "react"
import { UseThemeContext } from "./Providers/ThemeProvider"
import { GiLightSabers, GiStarfighter } from "react-icons/gi"
import { RiUserHeartFill } from "react-icons/ri"
import { Alert, Snackbar } from "@mui/material"
import UseFetch from "./Hooks/UseFetch"

function App() {
  const [theme, toggleTheme] = useContext(UseThemeContext())
  const [userInput, setUserInput] = useState<string>("")
  const navigate = useNavigate()
  const [characterNotFound, setCharacterNotFound] = useState(false)
  const [data, loading, error] = UseFetch(
    `https://swapi.dev/api/people/?search=${userInput}`
  )

  const handleInput = (e: any) => setUserInput(e.target.value)

  const handleSearch = async () => {
    if (!userInput) {
      return
    }
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${userInput}`
    )
    const data = await response.json()
    if (data.count > 0) {
      const characterId = data.results[0].url.split("/").slice(-2, -1)[0]
      navigate(`/bio/${characterId}`)
    } else {
      // handle case where no matching character is found
      setCharacterNotFound(true)
    }
    setUserInput("")
  }

  return (
    <div className={`app ${theme}`}>
      <header>
        <GiLightSabers onClick={() => toggleTheme()} className={"icon"} />
        <div>
          <Link to={"/"} className={"title"}>
            <h1 className='title'>Star Wars Innit</h1>
          </Link>

          <div className='search-container'>
            <input
              className='search-bar'
              type='text'
              placeholder='Search Character'
              value={userInput}
              onChange={handleInput}
            />
            <button
              placeholder='Search'
              className='search-button'
              onClick={handleSearch}
            >
              Search
            </button>

            {characterNotFound && (
              <Snackbar
                open={characterNotFound}
                autoHideDuration={6000}
                onClose={() => setCharacterNotFound(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  severity='info'
                  sx={{
                    width: "300px",
                    height: "120px",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "23px",
                    backgroundColor: "#c5baaf",
                    borderRadius: "12px",
                  }}
                  icon={<GiStarfighter />}
                >
                  Character not found!
                </Alert>
              </Snackbar>
            )}
          </div>
        </div>
        <GiLightSabers onClick={() => toggleTheme()} className={"icon"} />
        <RiUserHeartFill className={"icon favourite"} />
      </header>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/bio/:id' element={<BioPage />} />
        <Route path='/search' element={<BioPage />} />
      </Routes>
    </div>
  )
}

export default App
