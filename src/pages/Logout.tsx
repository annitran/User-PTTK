import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { logout } from '../services/admin'

export default function Logout() {
  const navigate = useNavigate()
  const { setAdmin } = useAuth()

  useEffect(() => {
    const doLogout = async () => {
      try {
        await logout()
        setAdmin(null)
        navigate('/')
      } catch (err) {
        console.error('Logout failed', err)
        navigate('/')
      }
    }

    doLogout()
  }, [navigate, setAdmin])

  return <p className="text-center p-4">Logging out...</p>
}
