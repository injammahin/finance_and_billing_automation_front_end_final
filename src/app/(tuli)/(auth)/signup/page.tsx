"use client";
import { useState } from "react";
import axios from "axios";
import { UserDto } from "../../../backend/src/users/dto/user.dto"; // Import the UserDto
import router from "next/router";

const SignUpPage = () => {
  const [userData, setUserData] = useState<UserDto>({
    username: "",
    password: "",
    name: "",
    email: "",
    role: "member",
  });
  const [error, setError] = useState("");
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !userData.username ||
      !userData.password ||
      !userData.name ||
      !userData.email
    ) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/signup",
        userData
      );

      // Check response and handle successful registration
      console.log("Registration successful:", response.data);

      // Reset the form and clear errors
      setUserData({
        username: "",
        password: "",
        name: "",
        email: "",
        role: "member",
      });
      setError("");
      setUsernameExists(false);
      setEmailExists(false);
    } catch (error) {
      // Handle specific error cases
      if (axios.isAxiosError(error)) {
        if (
          error.response?.status === 409 &&
          error.response?.data?.message === "Username is already taken"
        ) {
          setUsernameExists(true);
          setError(
            "Username is already taken. Please choose a different username."
          );
        } else if (
          error.response?.status === 409 &&
          error.response?.data?.message === "Email is already taken"
        ) {
          setEmailExists(true);
          setError("Email is already taken. Please choose a different email.");
        } else {
          setUsernameExists(false);
          setEmailExists(false);
          setError("Registration failed. Try again.");
        }
      } else {
        setUsernameExists(false);
        setEmailExists(false);
        setError("Registration failed. Try again.");
      }

      console.error("Registration error:", error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-8 bg-slate-50 rounded-md shadow-md ">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Finance and Billing Automation
      </h1>
      <h2 className="text-2xl font-bold mb-6 ">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Username:
          </label>
          <input
            type="text"
            name="username"
            className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-blue-500 transition"
            value={userData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Password:
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-blue-500 transition"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Name:
          </label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-blue-500 transition"
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Email:
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-blue-500 transition"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        {usernameExists && (
          <p className="text-red-500 mt-2">
            Username is already taken. Please choose a different username.
          </p>
        )}
        {emailExists && (
          <p className="text-red-500 mt-2">
            Email is already taken. Please choose a different email.
          </p>
        )}
        {error && !usernameExists && !emailExists && (
          <p className="text-red-500 mt-4">{error}</p>
        )}
        {/* <br /> */}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
export default SignUpPage;
