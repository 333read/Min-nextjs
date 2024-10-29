import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"

// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
//   SheetTrigger,
// } from "@/components/ui/sheet"
// import { Label } from "@/components/ui/label"
// import { Input } from '@/components/ui/input'
// import { Checkbox } from './components/ui/checkbox'
// import { Textarea } from "@/components/ui/textarea"
import  Drawer  from "@/components/drawer/page"
import { ProfileForm } from "@/components/drawer/draform"



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Drawer />

      <div className="card">
        <Button variant="outline" onClick={() => setCount((count) => count + 1)}>点点 {count}</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
