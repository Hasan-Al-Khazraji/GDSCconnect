import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User successfully registered');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-sm gap-4">
      <input
        type="email"
        placeholder="Email"
        className="p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="p-2 bg-green-500 text-white rounded">
        Sign Up
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default SignUpForm;
