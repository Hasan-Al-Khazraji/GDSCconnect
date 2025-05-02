import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import LoginForm from './LoginForm';
import { useParams } from 'react-router-dom';

function Header() {
  const { authUser, isLoggedIn } = useAuth();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { id } = useParams();

  const handleLogOut = async () => {
    const auth = getAuth();
    window.location.href = `/${id}`; 
    await signOut(auth);
  };

  const toggleLoginForm = () => {
    setShowLoginForm((prev) => !prev);
  };

  return (
    <div className="p-4 font-GoogleSansDisplay font-bold mt-4">
      {isLoggedIn ? (
        <>
          <button onClick={handleLogOut} className="p-2 bg-red-600 hover:bg-red-800 transition duration-150 ease-in-out text-white rounded shadow-[4px_5px_0px_-1px_rgba(0,_0,_0,_0.3)]">
            Log Out
          </button>
          <a href="/" className="ml-4 p-2 bg-emerald-500 hover:bg-emerald-800 transition duration-150 ease-in-out text-white rounded shadow-[4px_5px_0px_-1px_rgba(0,_0,_0,_0.3)]">
            View Other Users
          </a>
        </>
      ) : (
        <>
          {!showLoginForm ? (
            <button onClick={toggleLoginForm} className="p-2 bg-blue-500 hover:bg-blue-800 transition duration-150 ease-in-out text-white rounded">
              Log In
            </button>
          ) : (
            <LoginForm />
          )}
        </>
      )}
    </div>
  );
}

export default Header;
