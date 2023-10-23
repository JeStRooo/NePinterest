import { IPhoto } from '@/store/types'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export interface IImageList {
  photos: IPhoto[]
  error: FetchBaseQueryError | SerializedError | undefined
  isLoading: boolean
}
