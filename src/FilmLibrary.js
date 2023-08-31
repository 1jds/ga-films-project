import { FilmDetail, FilmDetailEmpty } from './FilmDetail'
import FilmRow from './FilmRow.js'
import { TMDB_API_KEY } from './TMDB'
import { useState, useEffect } from 'react'
import './FilmLibrary.css'
import { useParams } from 'react-router-dom'

function FilmLibrary() {
  const [selectedFilm, setSelectedFilm] = useState(null)
  const [favouriteFilms, setFavouriteFilms] = useState([])
  const [showOnlyFaves, setShowOnlyFaves] = useState(false)
  const [filmRowInfoLoading, setFilmRowInfoLoading] = useState(false)
  const [filmInfoLoading, setFilmInfoLoading] = useState(false)
  const [selectedFilmData, setSelectedFilmData] = useState()
  const [TMDBdata, setTMDBdata] = useState({ results: [] })
  const [favouritesCache, setFavouritesCache] = useState([{ id: 0 }])
  const [loadMoreFilmsCount, setLoadMoreFilmsCount] = useState(1)
  const [releaseYear, setReleaseYear] = useState(2023)

  useEffect(() => {
    setFilmRowInfoLoading(true)
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&certification_country=AU&certification.lte=M&include_video=false&page=${loadMoreFilmsCount}&with_watch_monetization_types=flatrate&primary_release_year=${releaseYear}`
    )
      .then((response) => response.json())
      .then((newMoviesData) => {
        setFilmRowInfoLoading(false)
        setTMDBdata((prevState) => ({
          results: [...prevState.results, ...newMoviesData.results],
        }))
        let favouritesCacheIDs = favouritesCache.map((item) => item.id)
        let newToFavsCache = newMoviesData.results.filter(
          (item) => !favouritesCacheIDs.includes(item.id)
        )
        setFavouritesCache((prevState) => [...prevState, ...newToFavsCache])
      })
      .catch((e) => {
        console.error(`An error occurred during fetching: ${e}`)
      })
  }, [loadMoreFilmsCount, releaseYear])

  function handleSelect(id) {
    setFilmInfoLoading(true)
    setSelectedFilm(id)
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
    )
      .then((response) => response.json())
      .then((usefulData) => {
        setFilmInfoLoading(false)
        setSelectedFilmData(usefulData)
      })
      .catch((e) => {
        console.error(`An error occurred during fetching: ${e}`)
      })
  }

  function handleFavourited(id) {
    favouriteFilms.includes(id) &&
      setFavouriteFilms((prevState) => [
        ...prevState.filter((item) => item !== id),
      ])
    !favouriteFilms.includes(id) &&
      setFavouriteFilms((prevState) => [...prevState, id])
  }

  function handleLoadMoreFilms() {
    setLoadMoreFilmsCount((prevState) => prevState + 1)
  }

  const { filmID } = useParams()
  useEffect(() => {
    handleSelect(filmID)
  }, [filmID])

  return (
    <div className="FilmLibrary">
      <nav>
        <h2 className="section-title">FILMS</h2>
        <h2 className="section-title">DETAILS</h2>
      </nav>
      <div className="film-list">
        <div className="film-list-filters">
          <button
            onClick={() => setShowOnlyFaves(false)}
            className={`grid-item-a film-list-filter ${
              showOnlyFaves ? '' : 'is-active'
            }`}
          >
            ALL
            <span className="section-count">{TMDBdata.results.length}</span>
          </button>
          <button
            onClick={() => setShowOnlyFaves(true)}
            className={`grid-item-b film-list-filter ${
              showOnlyFaves ? 'is-active' : ''
            }`}
          >
            FAVES
            <span className="section-count">{favouriteFilms.length}</span>
          </button>
          <form
            className="grid-item-c film-list-filter"
            action="/action_page.php"
          >
            <label htmlFor="release-year">Choose a year:</label>
            <select
              id="release-year"
              name="release-year"
              onChange={(e) => {
                setTMDBdata({ results: [] })
                setReleaseYear(e.target.value)
              }}
            >
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
            </select>
          </form>
        </div>
        <FilmRow
          filmRowInfoLoading={filmRowInfoLoading}
          showOnlyFaves={showOnlyFaves}
          favsIDs={favouriteFilms}
          favFilmsCache={favouritesCache}
          filmsData={TMDBdata.results}
          handleSelect={handleSelect}
          handleFavourited={handleFavourited}
        />
        {!showOnlyFaves ? (
          <div
            className="film-list-filter"
            style={{ margin: 0 }}
            aria="load more films"
            onClick={handleLoadMoreFilms}
            role="button"
          >
            Load more
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="film-details">
        {filmID ? (
          <FilmDetail
            loading={filmInfoLoading}
            filmsData={selectedFilmData}
            selectedFilm={selectedFilm}
          />
        ) : (
          <FilmDetailEmpty />
        )}
      </div>
    </div>
  )
}

export default FilmLibrary
