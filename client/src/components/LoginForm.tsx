import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const auth = getAuth();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message); 
            } else {
                setError(String(error)); 
            }
        }
        console.error('Login error:', error);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-center">Log In</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 border rounded"
                        required
                    />
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                        Log In
                    </button>
                    <hr/>
                    <a href="/" className="p-2 bg-white-500 text-blue-500 border-2 border-blue-500 rounded text-center">
                        Register
                    </a>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
