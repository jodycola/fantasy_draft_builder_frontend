import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    type: "user",
    initialState: null,
    reducers: {
        setUser(state, action){
            console.log("hey")
            return action.payload
        },
        removeUser(state, action){
            return state =null
        },
    },
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer