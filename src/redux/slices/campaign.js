import React from 'react'
import { useSelector, useDispatch } from 'react-redux' 
import { createSlice } from '@reduxjs/toolkit'

export const campaignSlice = createSlice({
    name: 'campaign',
    initialState: {
        isLoading: false,
        error: null,
        campaigns: [],
    },
    reducers: {
        addCampaign(state, action) {
            state.campaigns.push(action.payload)
        }
    }
})

export const { addCampaign } = campaignSlice.actions
export default campaignSlice.reducer;