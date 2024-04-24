import React, { FC, useEffect } from 'react'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import Image from 'next/image'

import { AntdImage } from '@/components/AntdImage'

import { IImageList } from '@/modules/ImageList/types'

import styles from './styles.module.scss'

import { LoadingOutlined } from '@ant-design/icons'
import ErrorImage from '@/assets/images/404.gif'
import { useRouter } from 'next/router'
import { useLikedPhotosQuery } from '@/store/service/mockApi'
import { IPhoto } from '@/store/types'

export const ImageList: FC<IImageList> = ({ photos, error, isLoading }) => {
  const {
    data,
    isLoading: isLoadingFavoritesPhotos,
    error: favoritesPhotosError,
    refetch,
  } = useLikedPhotosQuery({})

  useEffect(() => {
    refetch()
  }, [])

  console.log(data)

  if (error || favoritesPhotosError) {
    return (
      <div className={styles.messageContainer}>
        <Image
          src={ErrorImage}
          alt='Ошибка'
          width={480}
          height={380}
          className={styles.errorImage}
        />
      </div>
    )
  }

  if (isLoading || isLoadingFavoritesPhotos) {
    return (
      <div className={styles.messageContainer}>
        <LoadingOutlined className={styles.loadingImage} />
      </div>
    )
  }

  return (
    <ResponsiveMasonry className={styles.container}>
      <Masonry columnsCount={4} className={styles.imageList}>
        {photos?.map((photo: IPhoto) => (
          <AntdImage key={photo?.id} photo={photo} favoritesPhotos={data} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  )
}
