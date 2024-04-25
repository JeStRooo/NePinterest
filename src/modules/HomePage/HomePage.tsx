import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Header } from '@/modules/Header'
import { ImageList } from '@/modules/ImageList'
import {
  useGetPhotosQuery,
  useSearchPhotosQuery,
} from '@/store/service/photoApi'
import { IPhoto } from '@/store/types'

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [resultPhotos, setResultPhotos] = useState<IPhoto[]>([])
  const [firstSearchQuery, setFirstSearchQuery] = useState(true)

  const {
    data: searchResults,
    isLoading: searchLoading,
    error: searchError,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useSearchPhotosQuery({ page, query: searchQuery, per_page: 30 })

  const {
    data: allPhotos,
    isLoading: allPhotosLoading,
    error: allPhotosError,
  } = useGetPhotosQuery({
    page,
    per_page: 30,
  })

  const isLoading = !!searchQuery ? searchLoading : allPhotosLoading
  const error = !!searchQuery ? searchError : allPhotosError
  const photos = !!searchQuery ? searchResults?.results : allPhotos

  const handleSearchQuery = (value: string) => {
    setSearchQuery(value)
    setPage(1)
  }

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    if (searchQuery && firstSearchQuery) {
      setResultPhotos(photos || [])
      setFirstSearchQuery(false)
    } else {
      setResultPhotos((prevPhotos) => [...prevPhotos, ...(photos || [])])
    }
  }, [searchQuery, photos, firstSearchQuery])

  return (
    <>
      <Header
        searchQuery={searchQuery}
        handleSearchQuery={handleSearchQuery}
        isSearch
      />
      <InfiniteScroll
        dataLength={resultPhotos.length}
        next={loadMore}
        hasMore={!!photos && photos.length >= 30}
        loader={null}
      >
        <ImageList photos={resultPhotos} error={error!} isLoading={isLoading} />
      </InfiniteScroll>
    </>
  )
}
