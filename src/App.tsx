import type { FC } from 'react'
import Routes from './routes/Routes'
import { observer } from 'mobx-react'

const App: FC = () => {
  return <Routes />
}

export default observer(App)