import React, { useContext, useEffect, useState } from "react"
import UseFetch from "../Hooks/UseFetch"
import { useParams } from "react-router-dom"
import { Character } from "../Types"
import styles from "./BioPage.module.css"
import { Grid, Skeleton } from "@mui/material"
import { Box } from "@mui/system"
import { UseThemeContext } from "../Providers/ThemeProvider"

export default function BioPage() {
  const { id } = useParams()
  const [data, loading, error] = UseFetch(`https://swapi.dev/api/people/${id}`)
  const [world] = UseFetch(`https://swapi.dev/api/planets/${id}`)
  const [species] = UseFetch(`https://swapi.dev/api/species/${id}`)

  const { birth_year, gender, height, eye_color, mass, name } = data || {}
  const [theme] = useContext(UseThemeContext())
  return (
    <div className={`${styles["bio-container"]} ${styles[theme]}`}>
      {!loading ? (
        <>
          <h1 className={styles["character-name"]}>{name}</h1>
          <div className={styles.bio}>
            <div>Birth Year: {birth_year}</div>
            <div>Gender: {gender}</div>
            <div>Height: {height}cm</div>
            <div>Eye Colour: {eye_color}</div>
            <div>Mass: {mass} kg</div>
            {/* <div>Home World: {world?.name}</div> */}
            {/* <div>Species: {species?.name}</div> */}
            {/* <div>Language: {species?.language}</div> */}
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
            height={"40%"}
          />
        </>
      )}
    </div>
  )
}
