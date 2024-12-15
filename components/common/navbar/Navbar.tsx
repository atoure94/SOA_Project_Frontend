'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';



const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Obtenir le chemin actuel
    const pathname = usePathname();

    // Vérifier si le chemin correspond à la page Login ou Registration
    const isAuthPage = pathname === '/auth/login' || pathname === '/auth/register';

    return (
        <nav className='bg-black text-white' >
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

                {/* Menu déroulant pour les écrans petits */}
                <div
                    className={`lg:hidden ${
                        isMenuOpen ? 'block' : 'hidden'
                    } fixed top-20 left-0 w-full bg-black z-10`}
                >
                    <div className="flex flex-col items-center py-4">
                        <Link href="/" >
                            <button className="text-4xl text-white py-2 hover:bg-gray-400 px-4 rounded transition">
                                HOME
                            </button>
                        </Link>
                        <Link href="/shop" >
                            <button className="text-4xl text-white py-2 hover:bg-gray-400 px-4 rounded transition">
                                SHOP
                            </button>
                        </Link>
                        <Link href="/about" >
                            <button className="text-4xl text-white py-2 hover:bg-gray-400 px-4 rounded transition">
                                ABOUT
                            </button>
                        </Link>
                        {!isAuthPage && (
                            <Link href="/auth/login" >
                                <button className="text-4xl text-white py-2 hover:bg-gray-700 px-4 rounded transition">
                                    LOGIN
                                </button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Navigation Buttons pour les écrans larges */}
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
                    {!isAuthPage && (
                        <Link href="/auth/login" >
                            <button className="bg-neutral-950 text-white text-4xl hover:bg-gray-700 px-4 py-2 rounded transition">
                                LOGIN
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
