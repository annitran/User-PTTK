import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { admin, loading } = useAuth()

  if (loading) return <div className="text-center p-8"></div>

  return (
    <header className="sticky top-0 z-40">
      <nav className="bg-sky-100/60 backdrop-blur-sm text-sky-900 border-b border-sky-200/50 shadow-md">
        <div className="relative flex items-center px-4 py-3">
          {/* logo */}
          <div className="flex-none">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-sky-900 font-bold">HTQL</div>
            </Link>
          </div>

          {/* center */}
          <div className="flex-1 flex justify-center">
            <div className="hidden sm:flex items-center gap-4">
              { !admin ? (
                <Link to="/" className="px-3 py-2 rounded-md text-sm hover:bg-sky-300/60">Upload</Link>
              ) : (
                <>
                  <Link to="/projects/upload" className="px-3 py-2 rounded-md text-sm hover:bg-sky-300/60">Upload</Link>
                  <Link to="/projects/list" className="px-3 py-2 rounded-md text-sm hover:bg-sky-300/60">Danh sách</Link>
                </>
              )
              }
            </div>
          </div>

          {/* profile */}
          <div className="flex-none">
            <Menu mode="hamburger" />
          </div>
        </div>
      </nav>
    </header>
  );
}
