import { Button, Drawer, IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material'
import { FC, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { AddServer } from '../../wailsjs/go/main/App'
import { parseVmess } from '../../lib/vmessParser'

export const Navbar: FC<{ onNewServerAdded: () => void }> = ({ onNewServerAdded }) => {
  const [open, setOpen] = useState(false)
  const [server, setServer] = useState('')

  const handleAddServer = () => {
    setOpen(false)
    const vmess = parseVmess(server)
    if (vmess) {
      const name = vmess.name
      vmess.name = undefined
      AddServer(name || `VPN ${vmess.server}:${vmess.server_port}`, {
        type: 'vmess',
        ...vmess,
      }).finally(() => {
        onNewServerAdded()
      })
      setServer('')
    }
  }
  return (
    <div className="flex justify-between px-4 w-full font-bold mt-2">
      <span className="mt-1">Marz</span>
      <IconButton onClick={setOpen.bind(null, true)}>
        <AddIcon />
      </IconButton>
      <Drawer anchor="bottom" open={open} onClose={setOpen.bind(null, false)}>
        <div className="px-4 py-6 flex flex-col">
          <Typography variant="h6" gutterBottom>
            Add access key
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Copy and paste an access key to add a server.
          </Typography>
          <TextField
            placeholder="vmess://access-key"
            size="small"
            sx={{ mt: 1 }}
            onChange={(e) => {
              setServer(e.target.value)
            }}
          />
          <div className="flex justify-end mt-3">
            <Button variant="contained" onClick={handleAddServer}>
              Add Server
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  )
}
