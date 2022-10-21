import { MoreVert, OutboundOutlined, Sensors, TaskAlt } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material'
import { FC } from 'react'

export const Outbound: FC<{ connected?: boolean }> = ({ connected = false }) => {
  return (
    <Card className="p-4">
      <div className="flex justify-between">
        <div className="flex space-x-2">
          {!connected && <Sensors sx={{ width: 30, height: 30 }} />}
          {connected && <TaskAlt sx={{ width: 30, height: 30 }} className="text-green-500" />}
          <div className="flex flex-col">
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              VPN 1
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: -1 }}>
              123.123.123.123:2212
            </Typography>
          </div>
        </div>
        <IconButton sx={{ height: '40px', mt: '-7px', mr: '-8px' }}>
          <MoreVert />
        </IconButton>
      </div>

      <CardActions sx={{ p: 0 }} className="flex justify-end">
        <Button size="small" sx={{ px: 1 }}>
          {!connected ? 'Connect' : 'Disconnect'}
        </Button>
      </CardActions>
    </Card>
  )
}
