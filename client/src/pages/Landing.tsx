import { useState } from 'react';
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore';

export default function Landing() {
    const [uniqueId, setUniqueId] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (uniqueId.trim() && !isNaN(Number(uniqueId))) {
            try {
                console.log('meow1')
                const dataRef = doc(db, 'users', uniqueId);
                const snapshot = await getDoc(dataRef);
                console.log(snapshot.data())
                if (snapshot.exists()) {
                    const userData = snapshot.data();
                    console.log('User Data:', userData);
                    window.location.href = `/${uniqueId}`;
                } else {
                    alert('No data found for this ID, contact admin.');
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
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Enter Hacker ID</h1>
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
        </div>
    );
}