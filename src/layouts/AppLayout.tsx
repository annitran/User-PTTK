import { Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {
    const navigate = useNavigate()

  return (
    <div>
      <nav className="p-4 text-white flex gap-4 bg-base-300 px-4">
        <button className="btn btn-primary btn-sm" onClick={() => navigate('/login')}>Log In</button>
        <button className="btn btn-primary btn-sm" onClick={() => navigate('/admin/upload')}>Admin Upload</button>
      </nav>

      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}
