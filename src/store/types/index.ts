export interface IExistError {
  message: string
  code: number
  description: string
}

type TUrls = {
  raw: string
  full: string
  regular: string
  small: string
}

type TLinks = {
  self: string
  download_location: string
}

export interface IPhoto {
  id: string
  imageId: string
  created_at: string
  width: number
  height: number
  color: string
  description: string
  urls: TUrls
  links: TLinks
  imageUrl: string
}

export interface IFavoritePhoto {
  id: string
  imageUrl: string
  links: TLinks
  imageId: string
  created_at: string
}

export interface IInitialState {
  photos: IPhoto[]
  loading: boolean
  error: string | undefined
}
