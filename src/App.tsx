"use client"

import './App.css'
// import Tabsnav from './components/tabsnav/page' 
import MainPage from './components/main/page'
import {CardWithInStalled} from '@/components/tabsnav/installedcard'






function App() {
  
  return (
    
    <>
        <h1 className=" font-bold text-gray-800 text-left my-4 text-6xl md:text-5xl lg:text-3xl">YunApplication</h1>
        

        <MainPage />

        {/* <CardWithInStalled /> */}
      
        {/* <Tabsnav /> */}
    </>

  )
}

export default App
