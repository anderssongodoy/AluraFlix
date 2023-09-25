import { Toaster } from "react-hot-toast"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Categoria, Home, Video } from "./pages"

export const App = () => {

  return (
    <>
      <Toaster />
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video" element={<Video />} />
          <Route path="/categoria" element={<Categoria />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}