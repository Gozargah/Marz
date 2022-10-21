import { Typography } from '@mui/material'
import { Greet } from '../wailsjs/go/main/App'
import { Navbar } from './components/Navbar'
import { Outbound } from './components/Outbound'

function App() {
  function greet() {
    // Greet(name).then(updateResultText)
  }

  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <Navbar />
        <div className="px-4 mt-2 flex flex-col space-y-3">
          <Outbound connected />
          <Outbound />
        </div>
      </div>
      <Typography variant="body2" textAlign="center" sx={{ pb: 1 }} className="text-gray-400">
        © 2022{' '}
        <a href="https://github.com/gozargah/marz" className="text-blue-400 hover:underline">
          Marz
        </a>
      </Typography>
    </div>
  )
}

export default App
