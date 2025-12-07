import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login, getAdmin } from "../services/admin";
import axios from 'axios'

export default function Login({ closeModal }: { closeModal?: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { setAdmin } = useAuth()
  const navigate = useNavigate();

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    if (!username.trim() || !password) {
      setError("Vui lòng nhập tài khoản và mật khẩu.");
      return;
    }

    try {
      setLoading(true);
      await login({ username, password });
      const adminRes = await getAdmin()
      setAdmin(adminRes.data.admin)

      // ĐÓNG MODAL NGAY SAU KHI LOGIN THÀNH CÔNG
      if (closeModal) closeModal();

      navigate('/projects/list');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || 'Đăng nhập thất bại!')
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div>
            <h2 className="text-xl font-semibold align-middle">Đăng nhập</h2>
          </div>
        </div>

        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

        <label className="block text-sm mb-1">Username</label>
        <input
          placeholder="Tên đăng nhập"
          className="input input-bordered w-full mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="block text-sm mb-1">Password</label>
        <div className="relative mb-3">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="input input-bordered w-full pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); setShowPassword(s => !s); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.04-5.71M6.1 6.1A9.96 9.96 0 0112 3c5.523 0 10 4.477 10 10 0 1.04-.16 2.046-.46 3.0" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="checkbox checkbox-sm" />
            <span>Ghi nhớ đăng nhập</span>
          </label>
          <a className="text-sm text-sky-600 hover:underline" href="#">Quên mật khẩu?</a>
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
}
