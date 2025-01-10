import React, { useState, useEffect } from 'react';

const DMInitiative = ({ characters = [] }) => {
  const [characterData, setCharacterData] = useState([]);

  useEffect(() => {
    if (characters.length > 0) {
      setCharacterData(
        characters.map((char) => ({
          ...char,
          currentHP: char["HP Current"] ?? 0,  // Default to 0 if undefined
          inputHP: 0,
          action: 'damage',
        }))
      );
    }
  }, [characters]);

  const handleHealthChange = (characterId, changeHP, actionType) => {
    changeHP = Number(changeHP); // Ensure that changeHP is a number

    const updatedCharacters = [...characterData];
    const character = updatedCharacters.find(char => char.Name === characterId);

    if (!character) return;

    // Ensure currentHP is treated as a number
    const currentHP = Number(character.currentHP);
    const maxHP = Number(character["HP Max"]);

    let newHP;
    if (actionType === 'healing') {
      // Add to the current HP, but don't exceed max HP
      newHP = Math.min(currentHP + changeHP, maxHP);
    } else if (actionType === 'damage') {
      // Subtract from current HP, but don't go below 0
      newHP = Math.max(currentHP - changeHP, 0);
    }

    console.log("currentHP:", currentHP, "changeHP:", changeHP, "newHP:", newHP);

    // Update the character's HP
    character.currentHP = newHP;
    character.inputHP = 0;  // Reset after submit
    setCharacterData(updatedCharacters);

    // Send the updated health to the db
    fetch('http://localhost:5000/api/update-health', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        characterId: character.Name,
        changeHP: changeHP, 
        actionType,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Health updated successfully') {
        console.log('Health updated:', data.character);
      } else {
        console.error('Error updating health:', data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleInputChange = (index, value) => {
    const updatedCharacters = [...characterData];
    updatedCharacters[index].inputHP = Math.abs(value);  // Ensure positive number
    setCharacterData(updatedCharacters);
  };

  return (
    <div className="col-span-2">
      <h2 className="text-lg font-semibold mb-4 text-gray-100">DM Overview</h2>
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg p-4 rounded-md">
        <ul className="space-y-4 list-none">
          {characterData.map((character, index) => (
            <li key={index} className="w-1/2 grid grid-cols-4 gap-4 p-2 bg-gray-800 rounded mx-auto">
              <div className="col-span-1 w-full h-16 sm:h-24 mb-2 mx-auto">
                <img
                  src={character["Character Picture"]}
                  alt={character.Name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="col-span-2 flex flex-col justify-center items-center text-center">
                <h3 className="text-lg font-semibold text-gray-100">{character.Name}</h3>
                <div className="flex justify-between text-xs text-gray-300 w-full">
                  <span>Initiative: {character.Initiative}</span>
                  <span>AC: {character["Armor Class"]}</span>
                </div>
                <div className="flex items-center justify-between w-full mt-2">
                  <span
                    className={(() => {
                      const hpPercentage = (character.currentHP / character["HP Max"]) * 100;
                      if (hpPercentage >= 91) return "text-green-500";
                      if (hpPercentage >= 75) return "text-lime-500";
                      if (hpPercentage >= 50) return "text-yellow-500";
                      if (hpPercentage >= 25) return "text-orange-500";
                      return "text-red-500";
                    })()}
                  >
                    {character.currentHP} / {character["HP Max"]}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    value={character.inputHP}
                    onChange={(e) => handleInputChange(index, parseInt(e.target.value) || 0)}
                    min="0"
                    className="w-16 text-center bg-gray-700 text-gray-100 rounded px-1"
                  />
                  <button
                    onClick={() => handleHealthChange(character.Name, character.inputHP, 'healing')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    Heal
                  </button>
                  <button
                    onClick={() => handleHealthChange(character.Name, character.inputHP, 'damage')}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Damage
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DMInitiative;
