import React, {
  MouseEventHandler,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react"
import { useNavigate } from "react-router-dom"
import UseFetch from "../Hooks/UseFetch"
import { Character } from "../Types"
import styles from "./HomePage.module.css"
import { Box, Skeleton } from "@mui/material"
import { ThemeContext, useTheme } from "@emotion/react"
import { UseThemeContext } from "../Providers/ThemeProvider"

export default function HomePage() {
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const [theme] = useContext(UseThemeContext())
  const [data, loading, error] = UseFetch(
    "https://swapi.dev/api/people/?page=" + page,
    page
  )
  const r = /.*?([\d]+)\/$/

  interface MouseEventTarget {
    target: { innerText: String }
  }

  const clickHandler = (e: MouseEventTarget) => {
    const isNextBtn = e.target.innerText.includes("Next")
    if (isNextBtn && page <= data.count / 10) {
      setPage((prevPage) => prevPage + 1)
    } else if (page > 1 && !isNextBtn) {
      setPage((prevPage) => prevPage - 1)
    }
  }

  return (
    <div>
      <div className={`${styles["bio-container"]} ${styles[theme]}`}>
        {!loading ? (
          <>
            {data?.results.map(({ name, url }: Character) => (
              <div
                key={name}
                className={`${styles.character} ${styles[theme]}`}
                onClick={() => navigate(`/bio/${r.exec(url)![1]}`)}
              >
                {name}
              </div>
            ))}
            <div className={`${styles["page-button"]} ${styles[theme]}`}>
              <span onClick={() => clickHandler}>Prev Page</span>
              <span onClick={() => clickHandler}>Next Page</span>
            </div>
            {/* fix typesvcript correctly */}
          </>
        ) : (
          <>
            {Array(10)
              .fill(0)
              .map((el, i) => (
                <Skeleton
                  key={i}
                  className={styles["loading-box"]}
                  variant='rounded'
                  width={300}
                  height={300}
                />
              ))}
          </>
        )}
      </div>
    </div>
  )
}
