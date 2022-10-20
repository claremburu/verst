import { WorkHistoryTwoTone } from '@mui/icons-material'
import React from 'react'

function ProgressBar({bgColor,completed}) {
    const containerStyles = {
        width: '100%',
        height: '20',
        backgroundColor: '#20A4F3',
        borderRadius: '50',
        margin: 50
    }

    const fillerStyles = {
        width: `${completed}%`,
        height: '100%',
        backgroundColor: bgColor,
        borderRadius: 'inherit',
        transition: 'width 1s ease-in-out'
    }

    const labelStyles = {
        padding: 5,
        color:"#ffffff",
        fontWeight: 'bold',
    }
  return (
    <div>
        <div>
            <div style={containerStyles}>
                <div style={fillerStyles}>
                <span style={labelStyles}>{`${completed}%`}</span>
                </div>
        </div>
        </div>
    </div>
  )
}

export default ProgressBar