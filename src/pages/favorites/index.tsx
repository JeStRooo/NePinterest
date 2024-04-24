import React from 'react'

import { Provider } from 'react-redux'
import { store } from '@/store'
import { FavoritesPage } from '@/modules/FavoritesPage/FavoritesPage'

const Favorites: React.FC = () => (
  <Provider store={store}>
    <FavoritesPage />
  </Provider>
)

export default Favorites
