import React, {useContext, useState, useEffect} from 'react';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider(props){
    const [authUser, setAuthUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //     const subscribe = AuthService.subscribe((user)=>{
    //         if (user) {
    //             setAuthUser(user);
    //             setIsLoggedIn(true);
    //         }
    //         else {
    //             setAuthUser(null);
    //             setIsLoggedIn(false);
    //         }
    //     })

    //     return subscribe;
    // })

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