import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface HackerFormProps {
  onRedirect: (url: string) => void;
}

export default function HackerForm({ onRedirect }: HackerFormProps) {
  const [uniqueId, setUniqueId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (uniqueId.trim() && !isNaN(Number(uniqueId))) {
      try {
        const dataRef = doc(db, 'hackers', uniqueId);
        const snapshot = await getDoc(dataRef);

        if (snapshot.exists()) {
          const userData = snapshot.data();
          if (userData.email === '' && userData.password === '') {
            onRedirect(`/register/${uniqueId}`);
          } else {
            onRedirect(`/${uniqueId}`);
          }
        } else {
          alert('INVALID ID: Enter a valid unique ID from 001 to 250.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data.');
      }
    } else {
      alert('Please enter a valid unique ID from 001 to 250.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="text"
        value={uniqueId}
        onChange={(e) => setUniqueId(e.target.value)}
        placeholder="Enter unique integer ID"
        className="p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        View Profile
      </button>
    </form>
  );
}
