import { Routes, Route } from 'react-router-dom'
import ProjectDetail from '../pages/ProjectDetail.tsx'
import UploadProject from '../pages/UploadProject.tsx'
import Login from '../pages/Login.tsx'
import AppLayout from '../layouts/AppLayout.tsx'

export default function AppRouter() {
  return (
    <Routes>
      {/* Public pages */}
        <Route path="/" element={<UploadProject />} />
        <Route path="/login" element={<Login />} />

      {/* Protected pages */}
      <Route element={<AppLayout />}>
        <Route path="/admin/upload" element={<UploadProject />} />
        <Route path="/admin/detail" element={<ProjectDetail />} />
      </Route>
    </Routes>
  )
}
