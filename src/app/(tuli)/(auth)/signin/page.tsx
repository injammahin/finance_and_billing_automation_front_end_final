"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
import Link from "next/link";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/signin",
        { username, password },
        {
          withCredentials: true, //1hr UTC (Coordinated Universal Time)
        }
      );

      console.log("Signin successful:", response.data);

      localStorage.setItem("auth_token", response.data.access_token);

      // Store the token in a cookie
      // Cookies.set('Session', response.data.access_token, { expires: 1, path: '/' });

      router.push("/dashboard");
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          setError("Incorrect username or password");
        } else if (error.response.status === 404) {
          setError("User not found");
        } else {
          setError("Signin error. Please try again.");
        }
      } else if (error.request) {
        setError("No response from the server. Please try again later.");
      } else {
        setError("Unexpected error. Please try again.");
      }

      console.error("Signin error:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-8 bg-slate-50 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Finance and Billing Automation
      </h1>
      <h2 className="text-2xl font-bold mb-6">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-blue-500 transition"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-blue-500 transition"
          />
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Sign In
        </button>

        <Link href="/signup" className=" hover:bg-slate-200 transition">
          Do not have an account? Click here!
        </Link>
      </form>
    </div>
  );
};

export default SignInPage;
