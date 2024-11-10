import React from 'react';

const CharacterList = ({ characters = [] }) => {
  // Sort characters by initiative in descending order
  const sortedCharacters = [...characters].sort((a, b) => b.initiative - a.initiative);
  console.log(sortedCharacters);
  return (
    <div className="col-span-2">
      <h2 className="text-lg font-semibold mb-4 text-gray-100">Initiative Order</h2>
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-2 border-green-700 p-4 rounded-md">
        <ul className="space-y-2 list-disc list-inside">
          {sortedCharacters.map((character, index) => (
            <li key={index} className="flex p-2 bg-gray-800 rounded">
              <span className="font-semibold">{character.Initiative}: {character.Name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterList;
