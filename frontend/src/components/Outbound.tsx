import { MoreVert, OutboundOutlined, Sensors, TaskAlt } from '@mui/icons-material'
import { Button, Card, CardActions, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { RemoveServer } from '../../wailsjs/go/main/App'

type Server = {
  Id: string
  Name: string
  ServerOptions: any
  Connected: boolean
}

const findServerAddr = (obj: any): string => {
  for (const key of Object.keys(obj)) {
    if (key.includes('Options')) {
      if (typeof obj[key]?.ServerOptions?.Server !== 'undefined' && obj[key]?.ServerOptions?.Server.length > 0) {
        return `${obj[key]?.ServerOptions?.Server}:${obj[key]?.ServerOptions?.ServerPort}`
      }
    }
  }
  return ''
}

export const Outbound: FC<{ server: Server; onDelete: () => void }> = ({ server, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const rmServer = () => {
    handleClose()
    RemoveServer(server.Id).finally(() => {
      onDelete()
    })
  }
  return (
    <Card className="p-4">
      <div className="flex justify-between">
        <div className="flex space-x-2">
          {!server.Connected && <Sensors sx={{ width: 30, height: 30 }} />}
          {server.Connected && <TaskAlt sx={{ width: 30, height: 30 }} className="text-green-500" />}
          <div className="flex flex-col">
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              {server.Name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: -1 }}>
              {findServerAddr(server.ServerOptions)}
            </Typography>
          </div>
        </div>
        <IconButton onClick={handleClick} sx={{ height: '40px', mt: '-7px', mr: '-8px' }}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem className="w-[100px]" onClick={rmServer}>
            Forget
          </MenuItem>
        </Menu>
      </div>

      <CardActions sx={{ p: 0 }} className="flex justify-end">
        <Button size="small" sx={{ px: 1 }}>
          {!server.Connected ? 'Connect' : 'Disconnect'}
        </Button>
      </CardActions>
    </Card>
  )
}
