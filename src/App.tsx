
import { Outlet } from 'react-router'
import './App.css'
import Navbar from './component/layouts/Navbar'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  )
}

export default App
