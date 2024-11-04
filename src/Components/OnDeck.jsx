import { ResponsiveContainer } from 'recharts';
import { Shield, Heart, ArrowUpDown } from "lucide-react";

function OnDeck( {character} ) {
  return (
    <div>
    <h2 className='text-lg font-semibold mb-4 text-gray-100'>On Deck</h2>
    <div className='h-80'>
    <ResponsiveContainer width={"100%"} height={"100%"}>
        <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-2 border-yellow-400'>
        <img
            className="w-100 h-56 justify-self-center"
            src={character.image}
            alt="Card Image"
        />
        <div className="p-4">
                <h5 className="text-xl font-bold mb-2 text-gray-100">{character.name}</h5>
                <p className="text-gray-700 text-base text-gray-100"></p>
            </div>
            <ul className="border-t border-gray-200 divide-y divide-gray-200">
                <li className="p-4 text-gray-100"><Heart className="inline-block mr-2" />{character.healthCurrent}/{character.healthMax}</li>
                <li className="p-4 text-gray-100"><Shield className="inline-block mr-2" />{character.ac}</li>
                <li className="p-4 text-gray-100"><ArrowUpDown className="inline-block mr-2" />{character.init}</li>
            </ul>
            </div>
    </ResponsiveContainer>
    </div>
</div>
  );
}

export default OnDeck;