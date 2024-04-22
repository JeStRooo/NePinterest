import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPhoto } from '@/store/types'

export const photosApi = createApi({
  reducerPath: 'photosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_UNSPLASH_API,
  }),
  endpoints: (builder) => ({
    getPhotos: builder.query<IPhoto[], { page?: number; per_page?: number }>({
      query: ({ page, per_page }) => ({
        url: 'photos',
        method: 'GET',
        params: {
          client_id: process.env.NEXT_PUBLIC_ACCESS_KEY,
          page,
          per_page,
        },
      }),
    }),
    searchPhotos: builder.query<
      { results: IPhoto[]; total: number; total_pages: number },
      { page?: number; query?: string; per_page?: number }
    >({
      query: ({ page, query, per_page }) => ({
        url: 'search/photos',
        method: 'GET',
        params: {
          client_id: process.env.NEXT_PUBLIC_ACCESS_KEY,
          page,
          query,
          per_page,
        },
      }),
    }),
  }),
})

export const { useGetPhotosQuery, useSearchPhotosQuery } = photosApi
