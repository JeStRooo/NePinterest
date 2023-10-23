import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { IExistError, IPhoto } from '@/store/types'

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_UNSPLASH_API,
})

export const getPhotosThunk = createAsyncThunk<
  IPhoto[],
  { page?: number; query?: string; per_page?: number }
>('getPhotos', async ({ page, query, per_page }, { rejectWithValue }) => {
  try {
    const { data } = await AxiosInstance.get('/photos', {
      params: {
        client_id: process.env.NEXT_PUBLIC_ACCESS_KEY,
        page,
        query,
        per_page,
      },
      headers: {
        'Cache-control': 'no-cache',
      },
    })

    return data
  } catch (e) {
    const error: AxiosError<IExistError> = e as any
    console.log(e)

    return rejectWithValue(error.message)
  }
})
