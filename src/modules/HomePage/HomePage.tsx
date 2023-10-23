import React, { useEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import { Header } from '@/modules/Header'
import { ImageList } from '@/modules/ImageList'

import {
  useGetPhotosQuery,
  useSearchPhotosQuery,
} from '@/store/service/photoApi'

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [maxPhotoOnPage, setMaxPhotoOnPage] = useState(10)
  const [page, setPage] = useState(1)

  const {
    data: searchResults,
    isLoading: searchLoading,
    error: searchError,
  } = useSearchPhotosQuery({
    page,
    per_page: maxPhotoOnPage,
    query: searchQuery,
  })

  const {
    data: allPhotos,
    isLoading: allPhotosLoading,
    error: allPhotosError,
  } = useGetPhotosQuery({
    page,
    per_page: maxPhotoOnPage,
  })

  const isLoading = searchQuery ? searchLoading : allPhotosLoading
  const error = searchQuery ? searchError : allPhotosError
  const photos = searchQuery ? searchResults?.results : allPhotos

  const handleSearchQuery = (value: string) => {
    setSearchQuery(value)
  }

  const loadMore = () => {
    setMaxPhotoOnPage((prevState) => prevState + 10)

    if (maxPhotoOnPage === 40) {
      setPage((prevState) => prevState + 1)
    }
  }

  // useEffect(() => {
  //   if (maxPhotoOnPage === 40) {
  //     setPage((prevState) => prevState + 1)
  //   }
  // }, [maxPhotoOnPage])

  return (
    <>
      <Header searchQuery={searchQuery} handleSearchQuery={handleSearchQuery} />
      <InfiniteScroll
        dataLength={photos ? photos.length : 0}
        next={loadMore}
        hasMore={!isLoading && !error}
        loader={<p></p>}
      >
        <ImageList photos={photos!} error={error} isLoading={isLoading} />
      </InfiniteScroll>
    </>
  )
}
