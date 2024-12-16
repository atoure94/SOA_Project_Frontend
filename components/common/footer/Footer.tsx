// components/Footer.tsx
import React from 'react';





const Footer: React.FC = () => {
    return (
        <footer className= 'bg-black text-white py-6'  >
            <div className="container mx-auto px-4 text-center text-2xl">
                &copy; {new Date().getFullYear()} EDGE COLLECTIVE
            </div>
        </footer>
    );
};

export default Footer;
