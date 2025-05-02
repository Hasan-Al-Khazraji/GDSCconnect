import React, {useContext, useState, useEffect} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider(props){
    const [authUser, setAuthUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth(); // Get Firebase Auth instance
        const unsubscribe = onAuthStateChanged(auth, (user) => {       
            if (user) {
                setAuthUser(user);
                setIsLoggedIn(true);
            } else {
                setAuthUser(null);
                setIsLoggedIn(false);
            }
        })

        return () => unsubscribe();
    }, [])

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}