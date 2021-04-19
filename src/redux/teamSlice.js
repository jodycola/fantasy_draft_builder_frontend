import { createSlice } from "@reduxjs/toolkit"

const teamSlice = createSlice({
    name: "team",
    initialState: {},
    reducers: {
        selectTeam(state, action){
            return action.payload
        },
        removeTeam(state, action){
            return null
        },
        removePlayer(state, action){
            state = action.payload.team.contracts
            return state = state.filter( contract => contract.id !== action.payload.id )
        },
    },
})

export const { selectTeam, removeTeam, removePlayer} = teamSlice.actions
export default teamSlice.reducer