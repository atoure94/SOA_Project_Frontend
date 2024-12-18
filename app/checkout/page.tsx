// src/pages/checkout.tsx

'use client'

import React, { useState } from 'react';
import { useCart } from "@/components/context/CartContext";
import { useRouter } from 'next/navigation';  // Update import

const CheckoutPage: React.FC = () => {
    const { cart } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
    });
    const router = useRouter();  // Ensure it's used in a page context

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.price, 0);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Commande passée avec succès !');
        router.push('/confirmation');  // Navigation after form submission
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-8xl font-bold text-center mb-6 text-black">Caisse</h1>

            {cart.length === 0 ? (
                <div className="text-center text-lg text-gray-600">Votre panier est vide. Ajoutez des articles pour continuer.</div>
            ) : (
                <div>
                    <div className="mb-8">
                        <h2 className="text-4xl text-black font-semibold mb-4">Résumé de votre commande</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {cart.map((product) => (
                                <div key={product.productId} className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
                                    <h3 className="text-2xl text-black font-semibold mb-2">{product.name}</h3>
                                    <p className="text-gray-600 mb-2">{product.description}</p>
                                    <p className="text-gray-800 font-bold">Prix : {product.price} €</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 text-right text-4xl text-red-600 font-semibold">
                        Total : {calculateTotal()} €
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8">
                        <h2 className="text-3xl text-black font-semibold mb-4">Informations de livraison</h2>

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-xl text-gray-700">Nom</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 mt-2 border text-black border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="address" className="block text-xl text-gray-700">Adresse</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 mt-2 border text-black border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-xl text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 mt-2 border text-black border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mt-6 text-center">
                            <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Finaliser la commande
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
