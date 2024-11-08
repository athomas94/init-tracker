import { Shield, Heart, ArrowUpDown } from "lucide-react";

function OnDeck( {character} ) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-100">On Deck</h2>
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-2 border-yellow-700 h-100 w-full p-4 rounded-lg flex flex-col items-center">
        <img
          className="w-40 h-40 object-fill mb-4"
          src={character.image}
          alt="Card Image"
        />
        <div className="text-center">
          <h5 className="text-xl font-bold mb-2 text-gray-100">{character.name}</h5>
          <p className="text-gray-700 text-base text-gray-100"></p>
        </div>
        <ul className="w-full border-t border-gray-600 divide-y divide-gray-600 mt-2">
          <li className="flex items-center p-2 text-gray-100">
            <Heart className="inline-block mr-2" />
            {character.healthCurrent}/{character.healthMax}
          </li>
          <li className="flex items-center p-2 text-gray-100">
            <Shield className="inline-block mr-2" />
            {character.ac}
          </li>
          <li className="flex items-center p-2 text-gray-100">
            <ArrowUpDown className="inline-block mr-2" />
            {character.init}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OnDeck;