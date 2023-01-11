import { Skeleton } from "@mui/material"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import UseFetch from "../Hooks/UseFetch"
import { UseThemeContext } from "../Providers/ThemeProvider"
import styles from "./BioPage.module.css"

export default function BioPage() {
  const { id } = useParams()
  const [data, loading] = UseFetch(`https://swapi.dev/api/people/${id}`)
  const [world] = UseFetch(data?.homeworld, data)
  const [starShips] = UseFetch(data?.starships, data)

  const { birth_year, gender, height, eye_color, mass, name } = data || {}
  const [theme] = useContext(UseThemeContext())
  return (
    <div className={`${styles["bio-container"]} ${styles[theme]}`}>
      {!loading ? (
        <>
          <h1 className={`${styles["character-name"]}`}>{name}</h1>
          <div className={`${styles.bio}`}>
            <div>Birth Year: {birth_year}</div>
            <div>Gender: {gender}</div>
            <div>Height: {height}cm</div>
            <div>Eye Colour: {eye_color}</div>
            <div>Mass: {mass} kg</div>
            <div>Home World: {world ? world.name : "Unknown"}</div>
            <div>Star Ships: {starShips ? starShips.name : "None"}</div>
          </div>
        </>
      ) : (
        <>
          <Skeleton
            className={styles["loading-box"]}
            variant='rounded'
            width={"50%"}
            height={100}
          />
          <Skeleton
            className={styles["loading-box"]}
            variant='rounded'
            width={"50%"}
            height={400}
          />
        </>
      )}
    </div>
  )
}
