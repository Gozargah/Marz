import { Button, Drawer, IconButton, TextField, Typography } from '@mui/material'
import { FC, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'

export const Navbar: FC = () => {
  const [open, setOpen] = useState(false)
  const handleAddServer = () => {
    setOpen(false)
  }
  return (
    <div className="flex justify-between px-4 w-full font-bold mt-2">
      {/* <IconButton>
        <MenuIcon />
      </IconButton> */}
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
          <TextField placeholder="vmess://access-key" size="small" sx={{ mt: 1 }} />
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
