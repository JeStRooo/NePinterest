import React, { FC, useState } from 'react'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { Image as AntImage } from 'antd'
import Image from 'next/image'
import { Modal } from '@/components/Modal'

import { defaultModalState } from '@/modules/ImageList/constants'

import { IImageList } from '@/modules/ImageList/types'

import styles from './styles.module.scss'

import { EllipsisOutlined, LoadingOutlined } from '@ant-design/icons'
import ErrorImage from '@/assets/images/404.gif'

export const ImageList: FC<IImageList> = ({ photos, error, isLoading }) => {
  const [{ isShowModal, id }, setIsShowModal] = useState(defaultModalState)

  if (error) {
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

  if (isLoading) {
    return (
      <div className={styles.messageContainer}>
        <LoadingOutlined className={styles.loadingImage} />
      </div>
    )
  }

  const handleShowModal = (id: string) => {
    setIsShowModal((prevState) => ({
      ...prevState,
      isShowModal: true,
      id,
    }))
  }

  const handleClose = () => {
    setIsShowModal(defaultModalState)
  }

  return (
    <ResponsiveMasonry className={styles.container}>
      <Masonry columnsCount={4} className={styles.imageList}>
        {photos?.map((photo) => (
          <div key={photo.id} className={styles.imageContainer}>
            <AntImage
              src={photo?.urls?.regular}
              className={styles.image}
              loading='lazy'
              preview={{
                maskClassName: styles.customMask,
              }}
            />
            <EllipsisOutlined
              className={styles.moreInfo}
              onClick={() => handleShowModal(photo?.id)}
            />
            {photo?.id === id && (
              <Modal
                isOpen={isShowModal}
                onCancel={handleClose}
                downloadLink={photo?.links.download_location}
                copyImageLink={photo?.urls?.regular}
              />
            )}
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  )
}
