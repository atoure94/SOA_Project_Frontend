// src/pages/cart.tsx

'use client'

import React from 'react';
import { useCart } from "@/components/context/CartContext"; // Utiliser le contexte
import Link from 'next/link';

const CartPage: React.FC = () => {
    const { cart, removeFromCart } = useCart(); // Récupérer le panier et la fonction pour enlever un produit

    const handleRemove = (productId: number) => {
        removeFromCart(productId); // Supprimer le produit du panier
    };

    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.price, 0); // Calculer le total du panier
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-8xl font-bold text-center mb-6 text-black">Panier</h1>
            {cart.length === 0 ? (
                <div className="text-center text-lg text-gray-600">Votre panier est vide.</div>
            ) : (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cart.map((product) => (
                            <div key={product.productId} className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
                                <h2 className="text-2xl text-black font-semibold mb-2">{product.name}</h2>
                                <p className="text-gray-600 mb-2">{product.description}</p>
                                <p className="text-gray-800 font-bold">Prix : {product.price} €</p>
                                <button
                                    onClick={() => handleRemove(product.productId)}
                                    className="mt-4 px-4 py-2 rounded text-white font-semibold bg-red-500 hover:bg-red-600"
                                >
                                    Supprimer
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-right text-4xl text-red-600 font-semibold">
                        Total : {calculateTotal()} €
                    </div>
                    <div className="mt-4 text-center">
                        <Link href="/checkout">
                            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Passer à la caisse
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
