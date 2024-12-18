// src/components/Navbar.tsx

'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCart } from "@/components/context/CartContext";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cart } = useCart(); // Utiliser le panier via le contexte

    // Obtenir le chemin actuel
    const pathname = usePathname();

    // Vérifier si le chemin correspond à la page Login ou Registration
    const isAuthPage = pathname === '/auth/login' || pathname === '/auth/register';

    return (
        <nav className='bg-black text-white'>
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <div className="text-8xl">
                    <span className="cursor-pointer">EDGE</span>
                </div>

                {/* Hamburger Icon */}
                <button
                    className="block lg:hidden text-4xl"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ☰
                </button>

                {/* Navigation Buttons */}
                <div className="hidden lg:flex space-x-6">
                    <Link href="/" >
                        <button className="bg-transparent text-4xl hover:bg-gray-400 px-4 py-2 rounded transition">
                            HOME
                        </button>
                    </Link>
                    <Link href="/shop" >
                        <button className="bg-transparent text-4xl hover:bg-gray-400 px-4 py-2 rounded transition">
                            SHOP
                        </button>
                    </Link>
                    <Link href="/about" >
                        <button className="bg-transparent text-4xl hover:bg-gray-400 px-4 py-2 rounded transition">
                            ABOUT
                        </button>
                    </Link>

                    {/* Panier */}
                    <Link href="/cart">
                        <button className="bg-transparent text-4xl hover:bg-gray-400 px-4 py-2 rounded transition relative">
                            PANIER
                            {cart.length > 0 && (
                                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    </Link>

                    <Link href="/auth/login" >
                        <button className="bg-neutral-950 text-white text-4xl hover:bg-gray-700 px-4 py-2 rounded transition">
                            LOGIN
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
