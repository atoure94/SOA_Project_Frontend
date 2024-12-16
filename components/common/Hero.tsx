'use client'


import Link from "next/link";



// Importation de la police "Iceberg"


// Importation de la police "Poppins"


const HeroSection = () => {
    return (
        <section className="bg-neutral-950 text-white py-20 px-6 text-center">
            <h1 className={`  text-4xl md:text-6xl font-bold`}>
                Stand on the Edge - WEAR THE DIFFERENCE
            </h1>
            <p className={`  text-lg md:text-2xl mt-4`}>
                Discover our latest collection of bold and unique design
            </p>
            <Link href="/shop">
                <button
                    className="bg-red-600 hover:bg-red-700 text-white text-lg py-2 px-8 rounded-full mt-6 transition duration-300">
                    SHOP NOW
                </button>
            </Link>

        </section>
    );
};

export default HeroSection;
