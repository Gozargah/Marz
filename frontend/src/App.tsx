import { Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { GetAllServers } from '../wailsjs/go/main/App'
import { Navbar } from './components/Navbar'
import { Outbound } from './components/Outbound'

function App() {
  const [servers, setServers] = useState<any>(null)
  const getServers = useCallback(() => {
    GetAllServers().then((s) => {
      setServers(s)
    })
  }, [])
  useEffect(() => {
    getServers()
  }, [])

  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <Navbar onNewServerAdded={getServers} />
        <div className="px-4 mt-2 flex flex-col space-y-3">
          {servers &&
            servers.map((server: any) => {
              return <Outbound onChange={getServers} server={server} key={servers.Id} />
            })}
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
