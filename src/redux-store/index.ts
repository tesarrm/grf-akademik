// Third-party Imports
import { configureStore } from '@reduxjs/toolkit'

// Slice Imports
import chatReducer from '@/redux-store/slices/chat'
import calendarReducer from '@/redux-store/slices/calendar'
import kanbanReducer from '@/redux-store/slices/kanban'
import emailReducer from '@/redux-store/slices/email'
import { apiSlice } from "./features/api/apiSlice"
import authSlice from "./features/auth/authSlice"

export const store = configureStore({
  reducer: {
    // chatReducer,
    // calendarReducer,
    // kanbanReducer,
    // emailReducer
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice
  },
  devTools: false,
  // middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// call the load user funciton on every page load
const initializeApp = async () => {
    // await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }))
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }))
}

initializeApp()
