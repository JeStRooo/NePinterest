import { FC } from 'react'
import { AutoComplete as AntAutoComplete, Input } from 'antd'

import { useGetPhotosQuery } from '@/store/service/photoApi'

import { IAutoComplete } from '@/components/AutoComplete/types'

import styles from './AutoComplete.module.scss'

export const AutoComplete: FC<IAutoComplete> = ({ value, onChange }) => {
  return (
    <AntAutoComplete size='large' className={styles.autoComplete}>
      <Input.Search
        size='large'
        placeholder='Search'
        value={value}
        onSearch={onChange}
      />
    </AntAutoComplete>
  )
}
