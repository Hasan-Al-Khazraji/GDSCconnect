import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';

interface RegisterFormProps {
  onRedirect: (url: string) => void;
}

export default function RegisterForm({ onRedirect }: RegisterFormProps) {
  const [uniqueId, setUniqueId] = useState('');
  const { id } = useParams();

  useEffect(() => {
    if (id) setUniqueId(id);
  }, [id]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (uniqueId.trim() && !isNaN(Number(uniqueId))) {
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Firebase user created:', userCredential.user);

        const dataRef = doc(db, 'hackers', uniqueId);
        await updateDoc(dataRef, {
          email,
          password,
        });
        onRedirect(`/${uniqueId}`);
      } catch (error) {
        console.error('Error during registration:', error);
        alert(error);
      }
    } else {
      alert('Invalid Unique ID. Redirecting...');
      onRedirect(`/`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        required
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        required
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter a password"
        className="p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Register
      </button>
    </form>
  );
}