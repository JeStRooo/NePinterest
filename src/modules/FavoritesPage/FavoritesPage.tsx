import React, { useEffect } from 'react'
import { Header } from '@/modules/Header'
import { useLikedPhotosQuery } from '@/store/service/mockApi'
import { ImageList } from '@/modules/ImageList'

export const FavoritesPage: React.FC = () => {
  const { data, isLoading, error, refetch } = useLikedPhotosQuery({})

  useEffect(() => {
    refetch()
  }, [])

  return (
    <div>
      <Header isSearch={false} />
      <ImageList photos={data} error={error} isLoading={isLoading} />
    </div>
  )
}
