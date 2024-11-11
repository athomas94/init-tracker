import React from 'react';
import { Heart, Shield, Footprints, Eye } from "lucide-react";


function CharacterCard({ character }) {

    if (!character) {
        return <div>Loading...</div>; // Or some other fallback UI
      }
    return (
      <div className='w-full'>
          <img
            className="w-40 h-40 object-fill mb-4 mx-auto"
            src={character["Character Picture"]}
            alt="Card Image"
          />
          <div className="text-center">
            <h5 className="text-xl font-bold mb-2 text-gray-100">{character.Name}</h5>
            <p className="text-gray-700 text-base text-gray-100"></p>
          </div>
          <div className="text-center">
            <h5 className="text-sm mb-2 text-gray-100">Level {character.Level} {character.Class}</h5>
            <p className="text-gray-700 text-base text-gray-100"></p>
          </div>
          <ul className="w-full border-t border-gray-600 divide-y divide-gray-600 mt-2">
            <li className="flex items-center p-2 text-gray-100">
              <Heart className="inline-block mr-2" />
              {character["HP Current"]}/{character["HP Max"]}
            </li>
            <li className="flex items-center p-2 text-gray-100">
              <Shield className="inline-block mr-2" />
              {character.AC}
            </li>
            <li className="flex items-center p-2 text-gray-100">
              <Footprints className="inline-block mr-2" />
              {character.Speed}
            </li>
            <li className="flex items-center p-2 text-gray-100">
              <Eye className="inline-block mr-2" />
              {character["Passive Perception"]}
            </li>
          </ul>
        </div>
    );
  }
  
  export default CharacterCard;