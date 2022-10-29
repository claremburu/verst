import { Card, Stack, Typography } from '@mui/material'
import React from 'react'

function PoolsCard({title, content, textSize}) {
  return (
    <div>
        <Card variant="outlined" sx={{p:3}}>
            <Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                <Typography variant="subtitle1">{title}</Typography>
                <Typography variant="h4" textTransform="uppercase" fontSize={textSize}>
                  {content}
                </Typography>
              </Stack>
            </Card>
    </div>
  )
}

export default PoolsCard