"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "@/components/context/CartContext";

interface Product {
    productId: number;
    name: string;
    description: string;
    price: number;
}

// src/components/Shop.tsx

const Shop: React.FC = () => {
    const { addToCart, cart } = useCart(); // Utiliser le panier et la fonction d'ajout depuis le contexte
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<Product[]>(
                    "http://localhost:8081/api/products"
                );
                setProducts(response.data);
            } catch (err: any) {
                setError("Erreur lors de la récupération des produits : " + (err.response?.data?.message || err.message));
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Fonction pour ajouter un produit au panier
    const handleAddToCart = (product: Product) => {
        addToCart(product); // Ajouter au panier en utilisant le contexte
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-8xl font-bold text-center mb-6 text-black">SHOP</h1>
            {products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.productId} className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
                            <h2 className="text-4xl text-black font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-600 mb-2">{product.description}</p>
                            <p className="text-gray-800 font-bold">Prix : {product.price} €</p>
                            <button
                                onClick={() => handleAddToCart(product)}
                                disabled={cart.some(item => item.productId === product.productId)} // Vérifie si le produit est dans le panier
                                className={`mt-4 px-4 py-2 rounded text-white font-semibold transition ${
                                    cart.some(item => item.productId === product.productId)
                                        ? "bg-green-500 cursor-not-allowed"
                                        : "bg-gray-400 hover:bg-gray-500"
                                }`}
                            >
                                {cart.some(item => item.productId === product.productId) ? "Ajouté ✅" : "Ajouter au panier"}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">Aucun produit disponible.</p>
            )}
        </div>
    );
};

export default Shop;
