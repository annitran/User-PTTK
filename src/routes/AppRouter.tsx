import { Routes, Route } from 'react-router-dom'
import ProjectsList from '../pages/ProjectsList.tsx'
import UploadProject from '../pages/UploadProject.tsx'
import Login from '../pages/Login.tsx'
import AppLayout from '../layouts/AppLayout.tsx'
import Logout from '../pages/Logout.tsx'

export default function AppRouter() {
  return (
    <Routes>
      {/* Public pages */}
        <Route path="/login" element={<Login />} />

      {/* Protected pages */}
      <Route element={<AppLayout />}>
        <Route index element={<UploadProject />} />

        <Route path="/projects/upload" element={<UploadProject />} />
        <Route path="/projects/list" element={<ProjectsList />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  )
}
