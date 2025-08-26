import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'counter',
  initialState: {
    value: JSON.parse(localStorage.getItem('userInfo')) || null
  },
  reducers: {
    UserInfo : (state, action) => {
      state.value = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const {UserInfo  } = userSlice.actions

export default userSlice.reducer