"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {useCart} from "@/components/context/CartContext";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<Product[]>(
                    "http://localhost:8081/api/products"
                );
                setProducts(response.data);
            } catch (err: any) {
                setError(
                    "Erreur lors de la récupération des produits : " +
                    (err.response?.data?.message || err.message)
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div style={{ color: "red" }}>{error}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <div key={product.id} className="p-4 border rounded">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>{product.price} €</p>
                    <button
                        onClick={() => addToCart(product)}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Ajouter au panier
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Products;
