import React from 'react'
import Header from '../Components/Header'
import InCombat from '../Components/InCombat'
import OnDeck from '../Components/OnDeck'

const dummyData1 = {
  name: "Gideon Chucklephucker",
  image: "/public/assets/human_paladin_bard_with_a_tuba_shield_by_nowis_337_dd10veb-fullview.jpg",
  healthCurrent: 57,
  healthMax: 98,
  ac: 15,
  init: 12
}

const dummyData2 = {
  name: "Joe Rougan",
  image: "/public/assets/wfGwE3p.png",
  healthCurrent: 1,
  healthMax: 55,
  ac: 14,
  init: 1
}

const IniativeTracker = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title="Initiative!" />

      <main className='max-w-7x1l mx-auto py-6 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <InCombat character={dummyData1} />
        <OnDeck character={dummyData2}/>
        </div>
      </main>
    </div>
  )
}

export default IniativeTracker