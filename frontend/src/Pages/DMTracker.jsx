import { useEffect, useState } from 'react'
import React from 'react'
import Header from '../Components/Header'
import DMInitiative from '../Components/DMInitiative'

const IniativeTracker = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch characters from db
    fetch('http://localhost:5000/api/characters')
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
        setLoading(false);
      });
  }, []);

  // Sort characters by initiative in descending order
  const sortedCharacters = [...characters].sort((a, b) => b.Initiative - a.Initiative);
  return (
    <div className='flex-1 overflow-auto relative z-10 h-screen'>
      <Header title="Initiative!" />

      <main className='max-w-7x1l mx-auto py-6 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <DMInitiative characters={sortedCharacters}/>
        </div>
      </main>
    </div>
  )
}

export default IniativeTracker