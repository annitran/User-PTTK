import { createContext, useContext, useEffect, useState } from 'react'
import { getAdmin, type IAdmin } from '../services/admin'

type AuthContextType = {
  admin: IAdmin | null
  setAdmin: (admin: IAdmin | null) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<IAdmin | null>(null)
  const [loading, setLoading] = useState(true)

  // Nếu cookie đã có token thì tự lấy lại thông tin admin
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await getAdmin()
        setAdmin(res.data.admin)
      } catch (err) {
        console.log('Not logged in or token expired', err)
        setAdmin(null)
      } finally {
        setLoading(false)
      }
    }

    fetchAdmin()
  }, [])

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
