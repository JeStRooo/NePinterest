import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { LikeButton } from '@/components/LikeButton'
import { EllipsisOutlined, LoadingOutlined } from '@ant-design/icons'
import { Image as AntImage } from 'antd'
import { Modal } from '@/components/Modal'
import { IFavoritePhoto, IPhoto } from '@/store/types'
import {
  useLikePhotoMutation,
  useUnlikePhotoMutation,
} from '@/store/service/mockApi'
import styles from '@/modules/ImageList/styles.module.scss'

interface ImageProps {
  photo: IPhoto
  favoritesPhotos: IFavoritePhoto[]
}

export const AntdImage: React.FC<ImageProps> = ({ photo, favoritesPhotos }) => {
  const router = useRouter()

  const [isShowModal, setIsShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  const [likePhoto] = useLikePhotoMutation()
  const [unlikePhoto] = useUnlikePhotoMutation()

  const currentUrl = router.asPath

  const isFavoritesPage = currentUrl === '/favorites'

  const handleShowModal = () => {
    setIsShowModal(true)
  }

  const handleClose = () => {
    setIsShowModal(false)
  }

  const handleChangeLike = () => {
    if (!liked && !isFavoritesPage) {
      likePhoto({
        imageUrl: photo?.urls?.regular,
        links: photo?.links,
        imageId: photo?.id,
      })
        .unwrap()
        .then(() => {
          setLiked(true)
        })
    } else if (isFavoritesPage) {
      unlikePhoto({ id: photo?.id })
        .unwrap()
        .then(() => {
          setLiked(false)
        })
    }
  }

  useEffect(() => {
    if (
      favoritesPhotos?.find((el) => el?.imageId === photo?.id) ||
      isFavoritesPage
    ) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [favoritesPhotos, isFavoritesPage])

  return (
    <div
      className={loading ? styles.loadingImageContainer : styles.imageContainer}
    >
      <AntImage
        src={isFavoritesPage ? photo?.imageUrl : photo?.urls?.regular}
        className={styles.image}
        loading='lazy'
        preview={{ maskClassName: styles.customMask }}
        onLoad={() => setLoading(false)}
        placeholder={
          loading && <LoadingOutlined className={styles.loadingImage} />
        }
      />
      {!loading && (
        <div className={styles.actions}>
          <LikeButton liked={liked} handleLike={handleChangeLike} />
          <EllipsisOutlined
            className={styles.moreInfo}
            onClick={handleShowModal}
          />
        </div>
      )}
      <Modal
        isOpen={isShowModal}
        onCancel={handleClose}
        downloadLink={photo?.links.download_location}
        copyImageLink={photo?.urls?.regular}
      />
    </div>
  )
}
