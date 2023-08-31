import FilmLibrary from './FilmLibrary'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Error from './Error'
import { FilmDetail } from './FilmDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/films" element={<FilmLibrary />}>
        <Route path=":filmID" element={<FilmDetail />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default App
