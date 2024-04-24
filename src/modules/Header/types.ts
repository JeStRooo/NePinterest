export interface IHeader {
  isSearch: boolean
  searchQuery?: string
  handleSearchQuery?: (value: string) => void
}
