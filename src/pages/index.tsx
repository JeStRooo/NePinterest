import dynamic from 'next/dynamic'
import { Provider } from 'react-redux'
import { store } from '@/store'

const HomePage = dynamic(
  () => import('@/modules/HomePage').then((module) => module.HomePage),
  { ssr: false },
)

export default function Home() {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  )
}
