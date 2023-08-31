import './FilmRow.css'
import { Link } from 'react-router-dom'

function FilmRow(props) {
  let filmsToMap
  if (props.showOnlyFaves) {
    filmsToMap = props.favFilmsCache.filter((item) =>
      props.favsIDs.includes(item.id)
    )
  } else {
    filmsToMap = props.filmsData
  }
  let filmList = filmsToMap.map((item) => {
    return (
      <div key={`film-row-item-${item.id}`} className="FilmRow">
        <img
          src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}
          alt={`${item.title} film poster`}
        />
        <div className="film-summary">
          <h3>{item.title}</h3>
          <p>{item.release_date.slice(0, 4)}</p>{' '}
          <div className="actions">
            <button
              onClick={() => props.handleFavourited(item.id)}
              className="action"
              title="add to faves"
            >
              <span className="material-icons" aria-label="add to favourites">
                {props.favsIDs.includes(item.id)
                  ? `remove_from_queue`
                  : `add_to_queue`}
              </span>
            </button>
            <Link to={`/films/${item.id}`} className="action" title="read more">
              <span
                className="material-icons"
                aria-label="more about this film"
              >
                read_more
              </span>
            </Link>
          </div>
        </div>
      </div>
    )
  })
  return props.filmRowInfoLoading ? (
    <p style={{ textAlign: 'center' }}>Film info loading...</p>
  ) : props.showOnlyFaves && props.favsIDs.length === 0 ? (
    <p style={{ textAlign: 'center' }}>No films added to favourites yet...</p>
  ) : (
    <>{filmList}</>
  )
}

export default FilmRow
