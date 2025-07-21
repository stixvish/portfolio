import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate
} from 'react-router-dom'
import './styles/main.scss'
import Root from './root.jsx'
import Home from './pages/home/home'
import About from './pages/about/about'
import Experience from './pages/experience/experience'
import Projects from './pages/projects/projects'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<Home />} />
      <Route path='home' element={<Navigate to="/" replace />} />
      <Route path='about' element={<About />} />
      <Route path='experience' element={<Experience />} />
      <Route path='projects' element={<Projects/>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
