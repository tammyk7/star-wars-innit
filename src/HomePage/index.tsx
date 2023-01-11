import { Skeleton } from "@mui/material"
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import UseFetch from "../Hooks/UseFetch"
import { UseThemeContext } from "../Providers/ThemeProvider"
import { Character } from "../Types"
import styles from "./HomePage.module.css"

export default function HomePage() {
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const [theme] = useContext(UseThemeContext())
  const [data, loading, error] = UseFetch(
    "https://swapi.dev/api/people/?page=" + page,
    page
  )

  const r = /.*?([\d]+)\/$/

  const clickHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const isNextBtn = (e.target as HTMLElement).innerText.includes("Next")
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
      <div className={`${styles["page-button"]} ${styles[theme]}`}>
        <span onClick={(e) => clickHandler(e)}>Prev Page</span>
        {Array(9)
          .fill(0)
          .map((el, i) => (
            <span key={i} onClick={() => setPage(i + 1)}>
              {i + 1}
            </span>
          ))}
        <span onClick={(e) => clickHandler(e)}>Next Page</span>
      </div>
    </div>
  )
}
