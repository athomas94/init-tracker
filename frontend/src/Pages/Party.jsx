import React from 'react'
import Header from '../Components/Header'
import PartyCard from '../Components/PartyCard'
import { useEffect, useState } from 'react'

const Party = () => {

  const [party, setParty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch party from the backend
    fetch('http://localhost:5000/api/party')
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        setParty(data); // Store the data in state
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error('Error fetching party:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='flex-1 overflow-auto relative z-10 h-screen'>
    <Header title="Party Management" />

    <main className='max-w-4xl mx-auto py-6 sm:px-6 lg:px-8'>
      <ul className='grid grid-cols-4 lg:grid-cols-3 gap-8'>
        {party.map((character, index) => (
          <li key={index} className='flex p-2 bg-gray-800 rounded border-2 border-white-700'>
            <PartyCard character={character} />
          </li>
        ))}
      </ul>
    </main>
  </div>
  )
}

export default Party