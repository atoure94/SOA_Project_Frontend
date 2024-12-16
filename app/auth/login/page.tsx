'use client'

import React, { useState } from 'react';
import Link from "next/link";
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {navigate} from "next/dist/client/components/segment-cache/navigation";
import {useRouter} from "next/navigation";


const Login = () => {
    // State to store form inputs
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useRouter()

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:8081/api/login', {
                username: emailOrPhone,  // Make sure the backend expects "username"
                password
            });

            // Handle login success
            if (response.status === 200) {
                console.log('Login successful:', response.data);
                toast.success('Login successful!');
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);

            }
        } catch (error: any) {
            // Handle error response
            if (error.response) {
                setErrorMessage(error.response.data); // The backend error message
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
            console.error('Login error:', error);
        } finally {
            setLoading(false);

        }



    };

    return (
        <div className="flex items-center justify-center p-20 ">
            <div className="w-full max-w-md p-8 bg-white items-center justify-center border-2 border-black rounded-lg shadow-md border-b-black">
                <h1 className='text-4xl font-bold text-center mb-6 text-black'>LOGIN</h1>

                <form onSubmit={handleSubmit}>
                    {/* Champ Email ou Téléphone */}
                    <div className="mb-8">
                        <input
                            type="text"
                            placeholder="Email or Phone Number"
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            className="w-full px-4 py-3 border-neutral-300 text-black rounded-xl bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Mot de passe oublié */}
                    <div className="mb-2 text-right">
                        <Link href="/auth/forgot-password" className="text-sm text-black hover:underline">
                            forgot password
                        </Link>
                    </div>

                    {/* Champ Mot de passe */}
                    <div className="mb-10">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl text-black bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    {/* Error message */}
                    {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}

                    {/* Bouton Login */}
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

            {/* ToastContainer to show toast notifications */}
            <ToastContainer position="top-right"
                            autoClose={5000} // The toast will close after 5 seconds
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
