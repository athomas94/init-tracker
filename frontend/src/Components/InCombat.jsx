import React from 'react';
import CharacterCard from './CharacterCard';

function InCombat({ character }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-100">In Combat</h2>
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-2 border-red-700 h-100 w-full p-4 rounded-lg flex flex-col items-center">
        <CharacterCard character={character} />
      </div>
    </div>
  );
}

export default InCombat;
