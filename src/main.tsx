import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./App.css"
import { HashRouter } from "react-router-dom"
import ThemeProvider from "./Providers/ThemeProvider"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
)
