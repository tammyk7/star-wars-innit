import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./App.css"
import { BrowserRouter } from "react-router-dom"
import ThemeProvider from "./Providers/ThemeProvider"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
