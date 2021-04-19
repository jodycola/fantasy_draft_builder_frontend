import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        setUser(state, action){
            return action.payload
        },
        logoutUser(state, action){
            return state = null
        },
        updateName(state, action){
            return {...state, name:action.payload.name}
        },
        updateEmail(state, action){
            return {...state, email:action.payload.email}
        },
        updatePassword(state, action){
            return {...state, password:action.payload.password}
        }
    },
})

export const { setUser, logoutUser, updateName, updateEmail, updatePassword } = userSlice.actions
export default userSlice.reducer