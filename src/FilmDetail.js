import './FilmDetail.css'

function FilmDetail(props) {
  return props.loading ? (
    <div className="FilmDetail">
      <p>
        <i className="material-icons">subscriptions</i>
        <span>Loading selected film...</span>
      </p>
    </div>
  ) : props.filmsData ? (
    props.filmsData.success === false ? (
      <div className="FilmDetail">
        <p>
          <i className="material-icons">subscriptions</i>
          <span>Film ID not found. Try another ID.</span>
        </p>
      </div>
    ) : (
      <div className="FilmDetail is-hydrated">
        <figure className="film-backdrop">
          <img
            src={`https://image.tmdb.org/t/p/w1280${props.filmsData.backdrop_path}`}
            alt={`${props.filmsData.title} backdrop`}
          />
          <h1 className="film-title">{props.filmsData.title}</h1>
        </figure>

        <div className="film-meta">
          <p className="film-detail-overview">
            <img
              src={`https://image.tmdb.org/t/p/w780${props.filmsData.poster_path}`}
              className="film-detail-poster"
              alt={`${props.filmsData.title} poster`}
            />
            <p>
              <em>{props.filmsData.tagline}</em>
            </p>
            {props.filmsData.overview}
          </p>
        </div>
      </div>
    )
  ) : (
    <div className="FilmDetail">
      <p>
        <i className="material-icons">subscriptions</i>
        <span>Now how did you get here!?</span>
      </p>
    </div>
  )
}

function FilmDetailEmpty(props) {
  return (
    <div className="FilmDetail">
      <p>
        <i className="material-icons">subscriptions</i>
        <span>No film selected</span>
      </p>
    </div>
  )
}

export { FilmDetail, FilmDetailEmpty }
