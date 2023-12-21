import { useMemo } from 'react';
import { getHeroesByPublisher } from '../helpers';
import { HeroCard } from './';

export const HeroList = ({ publisher }) => {

    const heroes = useMemo( () => getHeroesByPublisher(publisher), [publisher]);
    
    heroes.sort((heroeA, heroeB) => (heroeA.superhero > heroeB.superhero) ? 1 : ((heroeB.superhero > heroeA.superhero) ? -1 : 0))

    return (
        <div className='row rows-cols-1 row-cols-md-3 g-3'>
            {
                heroes.map((heroe) =>
                    <HeroCard
                        key={heroe.id}
                        // De esta forma le enviamos todas las propiedades del objeto "heroe".
                        {...heroe}
                    />
                )
            }
        </div>
    )
}
