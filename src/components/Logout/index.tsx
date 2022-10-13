import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearUser } from '../../app/features/User/userSlice';
import { app } from '../../app/firebase/config';
import { useAppDispatch } from '../../app/hooks';

export default function Logout() {
  const auth = getAuth(app);
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('isLogged')
    dispatch(clearUser())
    console.log('logout')
    navigate('/', {replace:true})
  },[])
  return (
    <div>Haz cerrado sesi&oacute;n ! cx</div>
  )
}
