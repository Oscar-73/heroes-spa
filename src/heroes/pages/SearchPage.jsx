import queryString from 'query-string';
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from '../components';
import { getHeroesByName } from '../helpers';

export const SearchPage = () => {

  // Para obtener la navegación entre componentes.
  const navigate = useNavigate();

  // Para obtener información sobre la ubicación en la que nos encontramos.
  const location = useLocation();

  // Si no tiene valor, será ''.
  // De esta forma, diseccionamos la query del "navigate" del "onSearchSubmit" y extraemos sus elementos.
  const { q = '' } = queryString.parse(location.search);

  const heroes = getHeroesByName(q);

  // Booleanos para controlar los mensajes (alerts).
  const showSearch = (q.length === 0); // ? true : false;
  const showError = (q.length !== 0) && heroes.length === 0; // ? true : false;

  const { searchText, onInputChange } = useForm({
    searchText: q
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();

    navigate(`?q=${searchText.toLowerCase().trim()}`);
  }

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />

          <form onSubmit={onSearchSubmit} aria-label='form'>
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange} />

            <button className="btn btn-outline-primary mt-3">
              Search
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          <div
            className="alert alert-primary animate__animated animate__fadeIn"
            style={{ display: showSearch ? '' : 'none' }}
          >
            Search a hero
          </div>

          <div
            aria-label='alert-danger'
            className="alert alert-danger animate__animated animate__fadeIn"
            style={{ display: showError ? '' : 'none' }}
          >
            No heroes with <b>{q}</b>
          </div>

          {
            heroes.map(hero => (
              <HeroCard key={hero.id} {...hero} />
            ))
          }
        </div>

      </div>

    </>
  )
}
