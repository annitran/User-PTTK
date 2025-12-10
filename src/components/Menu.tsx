import { useState } from "react";
import { createPortal } from 'react-dom';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";

export default function Menu({ label, mode }: { label?: string, mode?: 'label' | 'hamburger' }) {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<null | 'login' | 'edit'>(null);

  const { admin } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 focus:outline-none px-2 py-1 rounded hover:bg-sky-200/40"
        onClick={() => setOpen(s => !s)}
      >
        {mode === 'hamburger' ? (
          <div className="flex flex-col justify-center items-center w-6 h-5 gap-1">
            <span className="block w-6 h-0.5 bg-current rounded" />
            <span className="block w-6 h-0.5 bg-current rounded" />
            <span className="block w-6 h-0.5 bg-current rounded" />
          </div>
        ) : (
          <span className="text-sm font-medium">{label || 'Hồ sơ'}</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg z-50 text-sm overflow-hidden ring-1 ring-indigo-50">

          <div className="p-3 border-b bg-indigo-50">
            <div className="font-medium text-indigo-800">
              {admin ? admin.username : "Khách"}
            </div>
            <div className="text-xs text-indigo-600">Hồ sơ</div>
          </div>

          <div className="flex flex-col p-2">
            {!admin ? (
              <button
                className="text-left px-3 py-2 rounded hover:bg-indigo-50 text-indigo-600 font-medium"
                onClick={() => { setModal('login'); setOpen(false); }}
              >
                Đăng nhập
              </button>
            ) : (
              <>
                <button
                  className="text-left px-3 py-2 rounded hover:bg-indigo-50 text-indigo-600 font-medium"
                  onClick={() => { setModal('edit'); setOpen(false); }}
                >
                  Chỉnh sửa hồ sơ
                </button>

                <button
                  className="text-left px-3 py-2 rounded hover:bg-slate-50 text-red-600"
                  onClick={() => {
                    navigate("/logout");
                  }}
                >
                  Đăng xuất
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* modal */}
      {modal && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModal(null)}></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 z-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-indigo-700">
                {modal === 'login' ? 'Đăng nhập' : 'Chỉnh sửa hồ sơ'}
              </h3>
              <button onClick={() => setModal(null)} className="text-indigo-500 hover:text-indigo-700">
                Đóng
              </button>
            </div>

            {modal === 'login' && <Login closeModal={() => setModal(null)} />}
            {modal === 'edit' && <EditProfileForm onDone={() => setModal(null)} />}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

function EditProfileForm({ onDone }: { onDone: () => void }) {
  return (
    <div>
      <button className="btn btn-primary mt-4 w-full" onClick={onDone}>
        OK
      </button>
    </div>
  );
}
