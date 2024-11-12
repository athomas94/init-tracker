import React from 'react';

const DMInitiative = ({ characters = [] }) => {
  return (
    <div className="col-span-2">
      <h2 className="text-lg font-semibold mb-4 text-gray-100">DM Overview</h2>
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg p-4 rounded-md">
        <ul className="space-y-4 list-none">
          {characters.map((character, index) => (
            <li key={index} className="w-1/2 grid grid-cols-4 gap-4 p-2 bg-gray-800 rounded mx-auto">
            {/* Picture taking up 1/3 of the container width (first column) */}
            <div className="col-span-1 w-full h-16 sm:h-24 mb-2 mx-auto">
              <img
                src={character["Character Picture"]}
                alt={character.Name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          
            {/* Character Info taking up 2/3 of the container width (remaining columns) */}
            <div className="col-span-2 flex flex-col justify-center items-center text-center">
              {/* Name on top line */}
              <h3 className="text-lg font-semibold text-gray-100">{character.Name}</h3>
              
              {/* Health indicator */}
              <div className="flex justify-between text-xs text-gray-300 w-full">
                <span>Initiative: {character.Initiative}</span>
                <span>AC: {character["Armor Class"]}</span>
          
                {/* Health Indicator with Dynamic Color Based on HP Percentage */}
                <span
                  className={(() => {
                    const hpPercentage = (character["HP Current"] / character["HP Max"]) * 100;
                    if (hpPercentage >= 91) return "text-green-500";  // Green for 91-100%
                    if (hpPercentage >= 75) return "text-lime-500";  // Lime for 75-90%
                    if (hpPercentage >= 50) return "text-yellow-500"; // Yellow for 50-75%
                    if (hpPercentage >= 25) return "text-orange-500"; // Orange for 25-50%
                    return "text-red-500"; // Red for 0-25%
                  })()}
                >
                  {character["HP Current"]} / {character["HP Max"]}
                </span>
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
