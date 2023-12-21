import { Link } from "react-router-dom";

// Con este minicomponente omitimos el apartado de personajes si un superhéroe siempre ha sido interpretado por el mismo personaje (véase Spider Man con Peter Parker).
const CharactersByHero = ({ alter_ego, characters }) => {
    return (alter_ego === characters)
    ? <></>
    : <p>{characters}</p>
};

export const HeroCard = ({
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters,
}) => {

    const heroImageUrl = `../../../docs/heroes/${id}.jpg`;

    const heroImageUrl2 = ".";

    return (
        <div className="col animate__animated animate__fadeIn">
            <div className="card">

                <div className="row no-gutters">

                    <div className="col-4">
                        <img src={heroImageUrl} className="card-img" alt={superhero} />
                    </div>

                    <div className="col-8">

                        <div className="card-body">

                            <h5 className="card-title">{superhero}</h5>
                            <p className="card-text">{alter_ego}</p>

                            <CharactersByHero alter_ego={alter_ego} characters={characters} />

                            <p className="card-text">
                                <small className="text-muted">{first_appearance}</small>
                            </p>

                            <Link to={`/hero/${id}`}>
                                Más información
                            </Link>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}
