import { configureStore } from '@reduxjs/toolkit'
import { photosApi } from '@/store/service/photoApi'

const devTools = process.env.NODE_ENV === 'development'

export const store = configureStore({
  reducer: {
    [photosApi.reducerPath]: photosApi.reducer,
  },
  devTools,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(photosApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
