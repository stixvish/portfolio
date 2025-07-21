import { Outlet } from 'react-router-dom'
import Header from './components/header/header'
import Home from './pages/home/home'
import styles from './root.module.scss'

function Root() {

  return (
    <div className={styles.main}>
      <Header />
      <Outlet />
    </div>
  )
}

export default Root
