import { useEffect, useState } from 'react'
import React from 'react'
import Header from '../Components/Header'
import InCombat from '../Components/InCombat'
import OnDeck from '../Components/OnDeck'
import InitiativeOrder from '../Components/InitiativeOrder'

const IniativeTracker = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch characters from the backend
    fetch('http://localhost:5000/api/characters')
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        setCharacters(data); // Store the data in state
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
        setLoading(false);
      });
  }, []);

  // Sort characters by initiative in descending order
  const sortedCharacters = [...characters].sort((a, b) => b.initiative - a.initiative);
  const firstCharacter = sortedCharacters[0];
  const secondCharacter = sortedCharacters[1];
  return (
    <div className='flex-1 overflow-auto relative z-10 h-screen'>
      <Header title="Initiative!" />

      <main className='max-w-7x1l mx-auto py-6 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <InCombat character={firstCharacter} />
          <OnDeck character={secondCharacter}/>
          <InitiativeOrder characters={characters}/>
        </div>
    </main>
    </div>
  )
}

export default IniativeTracker