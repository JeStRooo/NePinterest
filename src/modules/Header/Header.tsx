import { FC } from 'react'

import { AutoComplete } from '@/components/AutoComplete'
import Image from 'next/image'

import styles from './styles.module.scss'

import Avatar from '@/assets/images/Avatar.svg'
import { IHeader } from '@/modules/Header/types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from 'antd'

export const Header: FC<IHeader> = ({
  searchQuery,
  handleSearchQuery,
  isSearch,
}) => {
  const router = useRouter()

  const currentUrl = router.asPath

  const isFavoritesPage = currentUrl === '/favorites'

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {isFavoritesPage ? (
          <Button onClick={() => router.back()}>Назад</Button>
        ) : (
          <div className={styles.empty} />
        )}
        <div className={styles.searchContainer}>
          {isSearch && (
            <AutoComplete
              value={searchQuery}
              onChange={(value) => handleSearchQuery?.(value)}
            />
          )}
        </div>
        <div className={styles.profileContainer}>
          <Link href='/favorites'>
            <Image src={Avatar} width={48} height={46} alt='avatar' />
          </Link>
        </div>
      </div>
    </header>
  )
}
