import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css';
import App from './App.jsx'
import Notes from './components/notes/Notes.jsx'; 
import Home from './components/home/Home.jsx'; 
const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/notes",
      element:<Notes/>
    }
  ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

