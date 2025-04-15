// src/components/Auth/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase"; // Import Firebase auth configuration
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Navigate to the dashboard after successful login
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form
        onSubmit={handleLogin}
        className="bg-white text-purple-700 p-6 rounded-xl shadow-xl"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-2 rounded-lg border border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-lg">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-2 rounded-lg border border-gray-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-lg"
        >
          Login
        </button>
      </form>
      <div className="mt-4">
        <p>
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-indigo-300"
          >
            Sign up
          </button>
        </p>
      </div>
      <div className="mt-6">
        <button
          onClick={() => navigate("/")}
          className="text-white underline hover:text-indigo-200"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
  
}
