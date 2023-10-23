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
  download: string
}

export interface IPhoto {
  id: string
  created_at: string
  width: number
  height: number
  color: string
  description: string
  urls: TUrls
  links: TLinks
}

export interface IInitialState {
  photos: IPhoto[]
  loading: boolean
  error: string | undefined
}
