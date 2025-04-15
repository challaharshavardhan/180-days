// src/components/Auth/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase"; // Import Firebase auth configuration
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect to the dashboard after successful signup
    } catch (err) {
      setError("Failed to create an account. Please try again.");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-6">Sign Up</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form
        onSubmit={handleSignup}
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
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-lg">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 mt-2 rounded-lg border border-gray-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-lg"
        >
          Sign Up
        </button>
      </form>
      <div className="mt-4">
        <p>
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-300"
          >
            Log in
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
