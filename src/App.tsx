import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import ShoppingCart from './views/ShoppingCart'
import { useAppDispatch } from './app/hooks'
import { fetchItems } from './app/features/items/itemSlice'
import Login from './views/Login'
import { setUser, User } from './app/features/User/userSlice'
import Logout from './components/Logout'

function App() {
  const dispatch = useAppDispatch()
  console.log('App initialized cx')
  useEffect(()=>{
    dispatch(fetchItems())
    let logged = localStorage.getItem('isLogged')
    let user = {} as User
    if(logged){
      try{
        user = JSON.parse(localStorage.getItem('user') || '{}')
      } catch(e){
        console.log('Error: '+e)
      }
      console.log('Logged')
      dispatch(setUser(user))
    } else {
      console.log('Not logged')
    }
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shopping-cart' element={<ShoppingCart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
