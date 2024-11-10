import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import IniativeTracker from './Pages/IniativeTracker'
import Party from './Pages/Party'
import Enemies from './Pages/Enemies'
import Sidebar from './Components/Sidebar'

function App() {
  
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/message')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching:', error));
  }, []);

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>
      <Sidebar />
      <Routes>
        <Route path="/" element={<IniativeTracker />} />
        <Route path="/party" element={<Party />} />
        <Route path="/enemies" element={<Enemies />} />
      </Routes>
    </div>
  )
}

export default App
