import { useState } from 'react'
import './App.css'
import { Button } from '@uprompt/ui/components/button'

function App() {
  const [count, setCount] = useState(0)

  return (
  
    <Button>
        Click me
    </Button>
  )
}

export default App
