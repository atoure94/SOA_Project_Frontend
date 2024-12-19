'use client'


import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';


const AuthContext = createContext<any>(null);

// Composant fournisseur du contexte
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
    return useContext(AuthContext);
};




