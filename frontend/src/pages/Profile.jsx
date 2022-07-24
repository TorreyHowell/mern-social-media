import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { refresh } from '../features/auth/authSlice'

function Profile() {
  const { user, isSuccess } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [navigate, user, dispatch])
  return <div>Profile</div>
}
export default Profile
