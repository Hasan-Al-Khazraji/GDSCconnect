import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import LoginForm from './LoginForm';

function Header() {
  const { authUser, isLoggedIn } = useAuth();
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLogOut = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  const toggleLoginForm = () => {
    setShowLoginForm((prev) => !prev);
  };

  return (
    <div className="p-4">
      {isLoggedIn ? (
        <>
          <button onClick={handleLogOut} className="p-2 bg-red-500 text-white rounded">
            Log Out
          </button>
          <a href="/" className="ml-4 p-2 bg-green-500 text-white rounded">
            View Other Users
          </a>
        </>
      ) : (
        <>
          {!showLoginForm ? (
            <button onClick={toggleLoginForm} className="p-2 bg-blue-500 text-white rounded">
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
