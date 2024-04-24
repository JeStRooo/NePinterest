import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mockApi = createApi({
  reducerPath: 'mockApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_MOCK_API,
  }),
  endpoints: (builder) => ({
    likePhoto: builder.mutation<
      void,
      { imageUrl: string; links: object; imageId: string }
    >({
      query: ({ imageUrl, links, imageId }) => ({
        url: 'photos',
        method: 'POST',
        body: {
          id: '$datatype.uuid',
          createdAt: '$date.recent',
          imageUrl: imageUrl,
          links: links,
          imageId: imageId,
        },
      }),
    }),
    unlikePhoto: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `photos/${id}`,
        method: 'DELETE',
      }),
    }),
    likedPhotos: builder.query({
      query: () => ({
        url: 'photos',
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useLikePhotoMutation,
  useUnlikePhotoMutation,
  useLikedPhotosQuery,
} = mockApi
