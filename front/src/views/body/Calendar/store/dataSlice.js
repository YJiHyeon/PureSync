import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSleepCalendar } from 'services/BodyService'

export const getEvents = createAsyncThunk(
    'sleepCalendar/data/getEvents',
    async () => {
        const response = await apiGetSleepCalendar()
        console.log(response.data.data.sleepList);
        return response.data.data.sleepList;
    }
)

const dataSlice = createSlice({
    name: 'sleepCalendar/data',
    initialState: {
        loading: false,
        eventList: [],
    },
    reducers: {
        updateEvent: (state, action) => {
            state.eventList = action.payload.data
        },
    },
    extraReducers: {
        [getEvents.fulfilled]: (state, action) => {
            state.eventList = action.payload.data
        },
    },
})

export const { updateEvent } = dataSlice.actions

export default dataSlice.reducer
