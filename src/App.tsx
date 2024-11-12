"use client"

import './App.css'
import MainPage from './components/main/page'
import RootLayout from './layout'






function App() {
  
  return (
    
    <>
    <RootLayout>

   
        <h1 className=" font-bold text-gray-800 text-left my-4 text-6xl md:text-5xl lg:text-3xl">YunApplication</h1>
        

        <MainPage />

      </RootLayout>
    </>

  )
}

export default App
