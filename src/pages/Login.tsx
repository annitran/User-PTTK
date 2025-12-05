import { useState } from "react";
import { login } from "../services/login";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await login({ username, password });
    localStorage.setItem("token", res.data.token);
    window.location.href = "/admin/detail";
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 shadow bg-base-100 rounded">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <input
        placeholder="Username"
        className="input input-bordered w-full mb-4"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="••••••••"
        className="input input-bordered w-full mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" className="btn btn-primary w-full" onClick={handleLogin}>
        Log In
      </button>
    </div>
  );
}
