import { FC } from 'react'

import { AutoComplete } from '@/components/AutoComplete'
import Image from 'next/image'

import styles from './styles.module.scss'

import Avatar from '@/assets/images/Avatar.svg'
import { IHeader } from '@/modules/Header/types'

export const Header: FC<IHeader> = ({ searchQuery, handleSearchQuery }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.empty} />
        <div className={styles.searchContainer}>
          <AutoComplete
            value={searchQuery}
            onChange={(value) => handleSearchQuery(value)}
          />
        </div>
        <div className={styles.profileContainer}>
          <Image src={Avatar} width={48} height={46} alt='avatar' />
        </div>
      </div>
    </header>
  )
}
