import { RouteComponentProps, Link, Redirect } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

// Contexts
import { useCharacterContext } from '../contexts/CharacterContext';

// Components
import Navbar from './Navbar';
import CharacterFrame from './CharacterFrame';

// Types
import TranslatedCategory from '../types/TranslatedCategory';

type MatchParams = {
    category?: string | undefined;
}

const Characters = ({ match, history }: RouteComponentProps<MatchParams>) => {
    const { params: { category, } } = match;
    const translatedCategory: TranslatedCategory = {
        symbols: 'simbol',
        letters: 'huruf',
        numbers: 'angka',
    };

    // Contexts
    const characterContext = useCharacterContext();

    // Functoins
    const getLinkCharacter = (category: string | undefined, character: string | number) => {
        switch (category) {
            case 'symbols': return encodeURIComponent(character);
            case 'letters': return typeof character === 'string' ? character.toLowerCase() : character;
            default: return character;
        };
    };

    return (
        <div className="flex-grow text-white">
            <Navbar
                leftButton={{
                    onClick: () => history.replace('/'),
                    icon: <FaChevronLeft size="0.83rem" />
                }}
            />

            <main>
                <section className="text-center pt-19 px-12 pb-10 md:pt-25 md:pb-16">
                    <p className="text-sm font-semibold">Pilih salah satu <strong className="font-bold">{category ? translatedCategory[category] || 'karakter' : 'karakter'}</strong> untuk mulai melihat detailnya.</p>
                </section>
                <section className="grid grid-cols-4 gap-2 px-8 mb-8 md:mx-auto md:grid-cols-8 md:w-1/2">
                    {(category && characterContext.characters[category]) ? (characterContext.characters[category] as Array<string | number>).map((character) => (
                        <Link to={`/characters/category/${category}/${getLinkCharacter(category, character)}`} key={character}>
                            <CharacterFrame size="full" textSize="3xl" rounded="lg">
                                {character}
                            </CharacterFrame>
                        </Link>
                    )) : <Redirect to="/404" />}
                </section>
            </main>
        </div>
    );
};

export default Characters;