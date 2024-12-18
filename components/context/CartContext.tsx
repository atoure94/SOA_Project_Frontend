// src/components/context/CartContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from "react";

// Définir l'interface de l'article
interface Product {
    productId: number;
    id: number;
    name: string;
    description: string;
    price: number;
}

interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Product[]>([]);

    // Ajouter un article au panier
    const addToCart = (product: Product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    // Supprimer un article du panier
    const removeFromCart = (productId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
    };


    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Utiliser le contexte dans d'autres composants
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
