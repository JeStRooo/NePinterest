import { FC } from 'react'

import { message, Modal as AntdModal } from 'antd'

import { IModal } from '@/components/Modal/types'

import { DownloadOutlined, LinkOutlined } from '@ant-design/icons'
import { HeartSvg } from '@/assets/images/HeartIcon'

import styles from './styles.module.scss'

export const Modal: FC<IModal> = ({
  isOpen,
  onCancel,
  downloadLink,
  copyImageLink,
}) => {
  const [messageApi, contextHolder] = message.useMessage()

  const handleDownLoadPhoto = () => {
    if (typeof window !== 'undefined') {
      const str =
        downloadLink + `&client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`

      fetch(str)
        .then((response) => response.json())
        .then((data) => {
          const imageUrl = data.url

          fetch(imageUrl)
            .then((response) => response.blob())
            .then((blob) => {
              const url = URL.createObjectURL(blob)

              const link = document.createElement('a')
              link.href = url
              link.download = 'photo.jpg'
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)

              URL.revokeObjectURL(url)
            })
        })
    }
  }

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'The link has been successfully copied.',
    })
  }

  const handleCopyLink = () => {
    success()
    return navigator.clipboard.writeText(copyImageLink)
  }

  return (
    <AntdModal open={isOpen} onCancel={onCancel} footer={null} width={500}>
      {contextHolder}
      <div className={styles.header}>
        <h3>Would you like to share or download a photo?</h3>
        <HeartSvg />
      </div>
      <div className={styles.actions}>
        <LinkOutlined className={styles.link} onClick={handleCopyLink} />
        <DownloadOutlined
          className={styles.download}
          onClick={handleDownLoadPhoto}
        />
      </div>
    </AntdModal>
  )
}
