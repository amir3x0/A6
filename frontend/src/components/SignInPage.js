import React, { useState } from "react";
import { authenticateUser } from "../services/BackendService";
import { useNavigate } from "react-router-dom";

const SignInPage = ({ onSignIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const name = await authenticateUser(username, password);
    if (name) {
      // Store the access token in localStorage or in memory
      localStorage.setItem("name", name); // Storing token in localStorage
      navigate("/MyYummy"); // Navigate to the protected page
    } else {
      setErrorMessage("Login failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-lg mx-auto my-10 p-6 bg-white rounded shadow-md"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username:
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Your Username"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password:
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="******************"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </div>

      <div className="flex justify-center font-semibold font-2xl my-5">
        {errorMessage && (
          <p className="text-red-500 text-xs italic mt-4">{errorMessage}</p>
        )}
      </div>
    </form>
  );
};

export default SignInPage;
