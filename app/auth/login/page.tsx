'use client'


import React, { useState } from 'react';
import Link from "next/link";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/AuthContext";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useRouter();
    const { setIsLoggedIn } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:8081/api/login', {
                username,
                password
            });

            if (response.status === 200) {
                console.log('Login successful:', response.data);
                toast.success('Login successful!');

                // Enregistrer l'utilisateur dans le localStorage
                const userData = response.data;
                let users = JSON.parse(localStorage.getItem('users') || '[]');

                // Vérifier si l'utilisateur existe déjà
                const existingUser = users.find((user: any) => user.username === username);
                if (!existingUser) {
                    users.push(userData); // Ajouter un nouvel utilisateur
                    localStorage.setItem('users', JSON.stringify(users));
                }

                // Mettre à jour les commandes de l'utilisateur (exemple)
                let orders = JSON.parse(localStorage.getItem('orders') || '[]');
                const userOrders = orders.filter((order: any) => order.username === username);

                // Simuler l'ajout d'une commande (vous pouvez ajuster cela selon la logique de votre projet)
                const newOrder = { username, orderId: Date.now(), items: ["Item 1", "Item 2"] };
                userOrders.push(newOrder);
                orders = orders.filter((order: any) => order.username !== username); // Supprimer les anciennes commandes de cet utilisateur
                orders.push(...userOrders); // Ajouter les commandes mises à jour
                localStorage.setItem('orders', JSON.stringify(orders));

                // Mettre à jour l'état global pour indiquer que l'utilisateur est connecté
                setIsLoggedIn(true);

                setTimeout(() => {
                    navigation.push('/'); // Rediriger vers la page d'accueil
                }, 1000);
            }
        } catch (error: any) {
            if (error.response) {
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-20">
            <div className="w-full max-w-md p-8 bg-white items-center justify-center border-2 border-black rounded-lg shadow-md border-b-black">
                <h1 className='text-4xl font-bold text-center mb-6 text-black'>LOGIN</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-8">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border-neutral-300 text-black rounded-xl bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-2 text-right">
                        <Link href="/auth/forgot-password" className="text-sm text-black hover:underline">
                            forgot password
                        </Link>
                    </div>

                    <div className="mb-10">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl text-black bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className='w-60 py-3 text-4xl font-semibold text-white bg-gray-500 rounded-full shadow-lg hover:bg-black transition disabled:bg-gray-300'
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-center text-black">
                    Don’t you have an account?{" "}
                    <Link href="/auth/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Login;
