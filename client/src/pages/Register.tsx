import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from "../Contexts/AuthContext";

export default function Landing() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true); 
  const { authUser } = useAuth();
  const [alertShown, setAlertShown] = useState(false);

  if (authUser?.email && !alertShown) {
    setAlertShown(true); // Mark the alert as shown
    navigate(`/`);
  }

  useEffect(() => {
    const checkIfRegistered = async () => {
      if (!id) return;

      const userRef = doc(db, 'hackers', id);
      const snapshot = await getDoc(userRef);

      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.email && data.password) {
          navigate(`/${id}`, { replace: true }); 
          return;
        }
      }

      setChecking(false); // safe to show form
    };

    checkIfRegistered();
  }, [id, navigate]);

  const handleRedirect = (url: string) => {
    window.location.href = url;
  };

  if (checking) return null; 

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <RegisterForm onRedirect={handleRedirect} />
    </div>
  );
}
